const express = require('express');

const router = express.Router();

const helper = require('../helper');
const db = require('../db');
const notification = require('../notification');
const async = require('async');
const rewards = require('../rewards');
const socket = require('../socket');

router.get('/category', (req, res) => {
  db.Category.find({})
    .then(cat => {
      res.json(cat);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    })
});

router.post('/category', (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  if (user.level < 10) {
    return res.status(400).json({status: 'bad'});
  }

  if (req.body.subCategory && req.body.subCategory.length > 0) {
    db.Category.findById(req.body.subCategory)
      .then(cat => {
        if (!cat) {
          return res.status(400).json({status: 'bad', error: 'Invalid sub-category.'});
        }

        cat.subCategory.push({name: req.body.name});
        return cat.save()
      })
      .then(() => {
        res.json({status: 'ok'});
      })
      .catch(err => {
        res.status(400).json({status: 'bad', error: err});
      })
  } else {
    db.Category.create({name: req.body.name})
      .then(() => {
        res.json({status: 'ok'});
      })
      .catch(err => {
        res.status(400).json({status: 'bad', error: err});
      });
  }
});

router.delete('/category', (req, res) => {
  if (!req.body || !req.body.category) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  if (user.level < 10) {
    return res.status(400).json({status: 'bad'});
  }

  db.Category.findById(req.body.category)
    .then(cat => {
      if (req.body.subCategory) {
        cat.subCategory.pull(req.body.subCategory);
        return cat.save();
      } else {
        cat.remove();
        return cat.save();
      }
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.get('/', (req, res) => {
  const user = req.user;
  const sortBy = req.query.sortBy;

  db.User.findById(user.id)
    .then(user => {
      const users = user.connections.map(conn => conn.user);

      let query = {
        user: {'$in': users},
      };

      if (req.query.minPrice) {
        if (query.price === undefined) {
          query.price = {};
        }
        query.price['$gt'] = req.query.minPrice;
      }

      if (req.query.maxPrice) {
        if (query.price === undefined) {
          query.price = {};
        }
        query.price['$lt'] = req.query.maxPrice;
      }

      if (req.query.category) {
        query['category.category'] = req.query.category;

        if (req.query.subCategory) {
          query['category.subCategory'] = req.query.subCategory;
        }
      }

      if (req.query.name) {
        query['name'] = new RegExp(helper.escapeRegex(req.query.name));
      }

      if (req.query.lat && req.query.lng) {
        query.location = {'$near': [req.query.lat, req.query.lng]};
      }

      // if (sortBy === 'distance') {
      //   query.location = {'$near': [user.location[0], user.location[1]]}
      // }

      return db.Item.find(query, null, sortBy === 'time' ? {sort: {'created': -1}} : null)
        .skip(+req.query.offset || 0)
        .limit(+req.query.limit || 25)
        .exec()
    })
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/', (req, res) => {
  if (!req.body || !req.body.name || !req.body.photos || !req.body.description || !req.body.price || !req.body.category || !req.body.zip || !req.body.country || !req.body.city) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;

  db.Item.create({
    user: user.id,
    name: req.body.name,
    photos: req.body.photos,
    description: req.body.description,
    price: req.body.price,
    category: {
      category: req.body.category,
      subCategory: req.body.subCategory || undefined
    },
    zip: req.body.zip,
    country: req.body.country,
    city: req.body.city,
    created: new Date()
  })
    .then(item => {
      return db.User.findById(user.id)
        .populate('connections.user')
        .then(user => {
          user.items.push(item);
          let fromName = user.profile.fullName;
          let title = fromName + ' listed an item';
          let message = item.name + " • " + item.price + " • " + item.description;

          notification.notifyFriends(title, message, user, { type: 'item', id: item.id });
          
          socket.informFriends('newItem',user, item.id);
          
          return user.save();
        });
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .then(() => {
      rewards.redeem(user, Rewards.POST_ITEM, () => {

      });
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });
});

router.get('/search', (req, res) => {
  if (!req.query && !req.query.type && (!req.query.location || !req.query.name)) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  if (req.query.type !== 'fuzzy' && req.query.type !== 'exact') {
    return res.status(400).json({status: 'bad', error: 'Invalid type.'});
  }

  const exact = req.query.type === 'exact';

  let result = [];
  
  db.User.find()
  .select('-contacts')
    .populate({
      path: 'items',
      populate: {
        path: 'category.category',
        model: 'Category'
      }
    })
  .then(users => {
      async.each(users, (user, next) => {
        if (user.id === req.user.id) {
          return next();
        }

        const check = result.find(usr => {
          return usr.id === user.id;
        });
        
        var filtered = [];
        
        if (req.query.location) {
	        filtered = filtered.length > 0 ? filtered : user.items;
	        filtered = user.items.filter((i) => i.city.toLowerCase().includes(req.query.location.toLowerCase()) || i.country.toLowerCase().includes(req.query.location.toLowerCase()) || i.zip.toLowerCase().includes(req.query.location.toLowerCase()));
	    }
        
        if (req.query.name) {
	        filtered = filtered.length > 0 ? filtered : user.items;
	        filtered = filtered.filter((i) => i.name.toLowerCase().includes(req.query.name.toLowerCase()));
        }
        
        if (req.query.category) {
	        filtered = filtered.length > 0 ? filtered : user.items;
	        filtered = filtered.filter((i) => i.category.category.name.toLowerCase().includes(req.query.category.toLowerCase()));
        }
        
        user.items = filtered;

        if (!check) {
          result.push(user);
          next();
        }
        else {
          return next();
        }
      })
    })
    .then(() => {
      res.json(result);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/:id', (req, res) => {
  const user = req.user;

  db.Item.findById(req.params.id)
    .then(item => {
      item.user = user.id;
      item.name = req.body.name;
      item.photos = req.body.photos;
      item.description = req.body.description;
      item.price = req.body.price;
      item.zip = req.body.zip;
      item.country = req.body.country;
      item.city = req.body.city;
      
      let category = {};
      category.category = req.body.category;
      category.subCategory = req.body.subCategory || undefined;
	  item.category = category;

      return item.save()
  })
  .then(item => {
      return db.Item.findById(req.params.id)
	  	.populate('category.category')
    })
    .then(item => {
	    res.json(item)
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });
});

router.get('/:id', (req, res) => {
  db.Item.findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    })
});

router.delete('/:id', (req, res) => {
  db.Item.findById(req.params.id)
    .then(item => {
      item.remove();
      return item.save();
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    })
});

router.post('/:id/favorite', (req, res) => {
  const user = req.user;

  db.Item.findById(req.params.id)
    .populate('user')
    .then(item => {
      if (item.user.toString() === user.id) {
        throw 'You can\'t share your own jobs.';
      }

      if (item.favoritedBy.indexOf(user.id) > -1) {
        item.favoritedBy.pull(user.id);
      } else {
        item.favoritedBy.push(user.id);
      }

      return item.save()
    })
    .then(item => {
      return db.User.findById(user.id)
        .populate('connections.user')
        .then(user => {
          if (user.favoritedItems.indexOf(item.id) > -1) {
            user.favoritedItems.pull(item.id);
          } else {
            user.favoritedItems.push(item);

            let fromName = user.profile.fullName;
            let message = fromName + " favorited your item " + item.name;

            notification.notify('', message, item.user, { type: 'item', id: item.id });
          }

          return user.save();
        })
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .then(() => {
      rewards.redeem(user, Rewards.OFFER_ITEM, () => {

      });
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });

});

router.delete('/:id/favorite', (req, res) => {
  const user = req.user;

  db.User.findById(user.id)
    .then(user => {
      user.favorites.items.pull(user.id);
      return user.save();
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/:id/share', (req, res) => {
  const user = req.user;
  let updatedItem = {};

  db.Item.findById(req.params.id)
    .populate('user')
    .then(item => {
      if (item.user.toString() === user.id) {
        throw 'You can\'t share your own jobs.';
      }

      if (item.sharedBy.indexOf(user.id) > -1) {
        item.sharedBy.pull(user.id);
      } else {
        item.sharedBy.push(user.id);
      }

      return item.save()
    })
    .then(item => {
      return db.User.findById(user.id)
        .populate('connections.user')
        .then(user => {
          if (user.sharedItems.indexOf(item.id) > -1) {
            user.sharedItems.pull(item.id);
            user.items.pull(item.id);
          } else {
            user.sharedItems.push(item);
            user.items.push(item);

            let fromName = user.profile.fullName;
            let message = fromName + " shared your item " + item.name;

            notification.notify('', message, item.user, { type: 'item', id: item.id });
          }

          return user.save();
        })
    })
    .then(() => {
	    return db.Item.findById(req.params.id)
	    		.populate('category.category')
	    		.then(item => {
		    		updatedItem = item
	    		})
    })
    .then(() => {
      res.json(updatedItem);
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/:id/jolt', (req, res) => {
  const user = req.user;

  db.Item.findById(req.params.id)
    .then(item => {
      if (item.user.toString() === user.id) {
        throw 'You can\'t jolt to your own items.';
      }

      item.joltedBy.push(user.id);

      return item.save()
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/:id/offer', (req, res) => {
  const user = req.user;
  let updatedItem = {};

  db.Item.findById(req.params.id)
    .then(item => {
      if (item.user.toString() === user.id) {
        throw 'You can\'t offer to your own items.';
      }

      item.offeredBy.push(user.id);

      return item.save()
    })
    .then(() => {
	    return db.Item.findById(req.params.id)
	    		.populate('category.category')
	    		.then(item => {
		    		updatedItem = item
	    		})
    })
    .then(() => {
      res.json(updatedItem);
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/:id/view', (req, res) => {
  const user = req.user;

  db.User.findById(user.id)
    .then(user => {
      user.viewedItems.push(req.params.id);
      
      socket.informFriend('viewItem', user.id, user.id, req.params.id);
      
      return user.save();
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      res.status(400).json({status: 'bad', error: err});
    });

});

module.exports = router;
