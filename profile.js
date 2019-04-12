// test 22222222222222
const Promise = require('bluebird');
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');
const config = require('config');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');

const helper = require('../helper');
const crypto = require('../crypto');
const friend = require('../friend');
const rewards = require('../rewards');
const notification = require('../notification')

const apn = require('apn');
const apnProvider = require('../apn');
const socket = require('../socket');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, './assets/')
    },
    filename: (req, file, next) => {
      next(null, uuid() + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5e+6
  },
  fileFilter: (req, file, next) => {
    const accepted = ['image/jpeg', 'image/png', 'application/pdf'];
    next(null, _.includes(accepted, file.mimetype));
  }
});

const router = express.Router();

const google = require('../google');
const mailer = require('../mailer');
const db = require('../db');





router.get('/', (req, res) => {
  // res.json(req.user);
  const user = req.user;
  db.User.findById(user.id)
  	.select('-contacts')
    .populate('items')
    .populate('jobs')
    .populate('favoritedJobs')
    .populate('sharedJobs')
    .populate('favoritedItems')
    .populate('sharedItems')
    .populate('news')
    .populate('blogs')
    .populate('profile.skills.standard')
    .populate({
	    path: 'incentives',
	    model: 'Incentive',
	    populate: {
		    path: 'actions',
		    model: 'Action'
	    }
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.email = req.body.email || user.profile.email;
      user.profile.fullName = req.body.fullName || user.profile.fullName;
      user.profile.phone = req.body.phone || user.profile.phone;
      user.profile.summary = req.body.summary || user.profile.summary;
      user.profile.hidden = req.body.hidden || user.profile.hidden;

      return user.save();
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .then(() => {
      rewards.redeem(user, Rewards.EDIT_PROFILE, () => {

      });
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/notification', (req, res) => {
  if (!req.body || !req.body.token) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  if (req.body.token.length !== 64) {
    return res.status(400).json({status: 'bad', error: 'Invalid token.'});
  }

  const user = req.user;

  if (user.notificationTokens.indexOf(req.body.token) !== -1) {
    return res.status(400).json({status: 'bad', error: 'This token already exists.'});
  }

  user.notificationTokens.push(req.body.token);
  user.save()
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    })
});

router.put('/phone', (req, res) => {
  if (!req.body || !req.body.phone) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;

  if (req.body.phone === user.phone || !/^[0-9]+$/.test(req.body.phone)) {
    return res.status(400).json({status: 'bad', error: 'Invalid phone number.'});
  }

  const code = Math.floor(Math.random() * 9000) + 1000;

  db.User.findOne({phone: req.body.phone})
    .then(phone => {
      if (phone) {
        throw 'Phone number already exists in the database.';
      }

      user.phone = req.body.phone;
      user.verified = false;
      return user.save();
    })
    .then(user => {
      return db.Verification.create({
        user: user.id,
        phone: user.phone,
        code: code,
        active: true
      });
    })
    .then(() => {
      return mailer.send(`+${req.body.phone}`, `Your Jolt Mate confirmation code is: ${code}`);
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/address', (req, res) => {
  if (!req.body || !req.body.city || !req.body.state || !req.body.country || !req.body.zip || !req.body.countryCode) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;

  db.User.findById(user.id)
    .then(user => {
      user.profile.address.city = req.body.city;
      user.profile.address.state = req.body.state;
      user.profile.address.country = req.body.country;
      user.profile.address.zip = req.body.zip;
      user.profile.countryCode = req.body.countryCode;
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/username', (req, res) => {
  if (!req.body || !req.body.username) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findOne({'profile.username': req.body.username.toLowerCase()})
    .then(username => {
      if (username) {
        throw 'Username is already taken.'
      }

      return db.User.findById(user.id)
    })
    .then(user => {
      user.profile.username = req.body.username.toLowerCase();
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    })
});

router.put('/photo', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({status: 'bad', error: 'Unknown error.'});
  }

  if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
    return res.status(400).json({status: 'bad', error: 'Invalid MIME type.'});
  }

  const user = req.user;
  const url = `${config.get('app.assetUrl')}${req.file.path}`;

  db.User.findById(user.id)
    .then(user => {
      user.profile.photos = url;
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.delete('/photo', (req, res) => {
  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.photos = undefined;
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/resume', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({status: 'bad', error: 'Unknown error.'});
  }

  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({status: 'bad', error: 'Invalid MIME type.'});
  }

  const user = req.user;
  const url = `${config.get('app.assetUrl')}${req.file.path}`;

  db.User.findById(user.id)
    .then(user => {
      user.profile.resume = url;
      user.profile.resumeFile = req.file.originalname;
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.delete('/resume', (req, res) => {
  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.resume = undefined;
      user.profile.resumeFile = undefined;
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.get('/connections', (req, res) => {
  const user = req.user;

  db.User.findById(user.id)
    .populate({
	    path: 'connections.user',
	    populate: {
		    path: 'jobs',
		    model: 'Job'
		}
	})
	.populate({
	    path: 'connections.user',
	    populate: {
		    path: 'favoritedJobs',
		    model: 'Job'
		}
	})
	.populate({
	    path: 'connections.user',
	    populate: {
		    path: 'sharedJobs',
		    model: 'Job'
		}
	})
	.populate({
	    path: 'connections.user',
	    populate: {
		    path: 'items',
		    model: 'Item'
		}
	})
	.populate({
	    path: 'connections.user',
	    populate: {
		    path: 'favoritedItems',
		    model: 'Item'
		}
	})
	.populate({
	    path: 'connections.user',
	    populate: {
		    path: 'sharedItems',
		    model: 'Item'
		}
	})
    .sort('connections.user.profile.fullName')
    .then(user => {
      res.json(user.connections);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});























router.get('/search', async (req, res) => {

  if (!req.query || !req.query.type || (!req.query.text && !req.query.skills && !req.query.location)) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }


  if (req.query.type !== 'fuzzy' && req.query.type !== 'exact') {
    return res.status(400).json({status: 'bad', error: 'Invalid type.'});
  }

  const user = req.user;
  const exact = req.query.type === 'exact';

  let result = [];
  let searchBuilder = {};
  let searchQuery = [];

  let locationResult =[];
  let textResult = [];
  let skillsResuts = [];
  let locationData=[];
  let textData=[];
  let skillsData= [];
  let skills =[];
  let item ;
  let locationCount;
  let textCount;
  let skillsCount;
  let hasItemsCount;
  let hasJobsCount;


//1- Location
  if (req.query.location) {
      locationData = [
        {'profile.address.city':  req.query.location },
        {'profile.address.country':req.query.location },
        {'profile.address.state': req.query.location },
        {'profile.address.zip': req.query.location }
    ]
    await db.User.count({'$or': locationData})
    .then((res) => locationCount=res)
  if(locationCount!=0){
    searchBuilder['$or'] = locationData;
    searchQuery.push({
        '$or': locationData
    })}
  }




//2- Text
  if (req.query.text) {
      textData = [
          { 'phone': req.query.text },
          {'profile.fullName': req.query.text },
          {'profile.email':  req.query.text },
          // {'profile.username': { $regex: req.query.text }}
      ]

      await db.User.count({'$or': textData})
      .then((res) => textCount=res)

    if(textCount!==0){
      searchBuilder['$or'] = textData;
      searchQuery.push({
          '$or': textData
      })}
  }

//3- Skills
  if (req.query.skills) {

      let allSkills = req.query.skills.split(',')
     skillsData = {
         'profile.skills.custom.name': { '$in': allSkills }
     }

     skills = allSkills.map(function(v, i){return new RegExp(v, 'i')});

      searchBuilder['profile.skills.custom.name'] = { '$in': skills }

      await db.User.count({'$or': [skillsData]})
      .then((res) => skillsCount=res)



  if(skillsCount!=0){
    searchQuery.push({
        '$or': [ skillsData ]
    })
  }
  }


// //4. hasJobs
//   if (req.query.hasJobs) {
//
//     await db.User.count({'$or': locationData})
//     .then((res) => hasJobsCount=res)
//
//       searchBuilder['jobs.0'] = { $exists: true };
//     if(hasJobsCount !==0){
//       searchQuery.push({
//           'jobs.0': { '$exists': true }
//       })
//     }
//   }
//
//
//
//
//
// //5.hasItems
//   if (req.query.hasItems) {
//
//       searchBuilder['items.0'] = { $exists: true };
//       await db.User.count({'$or': locationData})
//       .then((res) => hasItemsCount=res)
//       if(hasItemsCount!==0){
//
//         searchQuery.push({
//           'items.0': { '$exists': true }
//         })
//       }
//   }



// console.log('fffffffffffffffffffffff', sea);

  db.User.find({'$and':searchQuery})
    .populate('connections.user')
    .populate('jobs')
    .populate('items')
    .populate('profile.skills.custom.list')
    .select('-contacts')
    .sort('connections.user.profile.fullName')
    .then(users => {
      async.each(users, (user, next) => {
        if (user.id === "5bbb1865fe1814224ca29a60") {
          return next();
        }
        const check = result.find(usr => {
          return usr.id === user.id;
        });
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
    .catch(err => res.status(400).json({status: 'bad', error: err}))

});























router.get('/jobs', (req, res) => {
  const user = req.user;

  db.User.findById(user.id)
    .populate('jobs')
    .then(user => {
      res.json(user.jobs);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.get('/items', (req, res) => {
  const user = req.user;

  db.User.findById(user.id)
    .populate('items')
    .then(user => {
      res.json(user.items);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/experience', (req, res) => {
  if (!req.body || !req.body.title || !req.body.company || !req.body.location || !req.body.startDate) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.experiences.push({
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
      });
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .then(() => {
      rewards.redeem(user, Rewards.UPDATE_JOB_PROFILE, () => {

      });
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.delete('/experience/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.experiences.pull(req.params.id);
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/education', (req, res) => {
  if (!req.body || !req.body.school || !req.body.degree || !req.body.field || !req.body.startDate) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.educations.push({
        school: req.body.school,
        degree: req.body.degree,
        field: req.body.field,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
      });
      return user.save();
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .then(() => {
      rewards.redeem(user, Rewards.UPDATE_JOB_PROFILE, () => {

      });
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.delete('/education/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.educations.pull(req.params.id);
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

// router.put('/skill', (req, res) => {
//   if (!req.body || !req.body.name) {
//     return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
//   }
//
//   const user = req.user;
//   db.User.findById(user.id)
//     .then(user => {
//       user.profile.skills.push({
//         name: req.body.name
//       });
//       return user.save();
//     })
//     .then(() => {
//       return res.json({status: 'ok'});
//     })
//     .catch(err => {
//       return res.status(400).json({status: 'bad', error: err});
//     });
// });

router.put('/skill', (req, res) => {
  if (!req.body || !req.body.skill) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;

  if (mongoose.Types.ObjectId.isValid(req.body.skill)) {
    user.profile.skills.standard.push(req.body.skill);
  } else {
    user.profile.skills.custom.push({name: req.body.skill});
  }
  user.save()
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.delete('/skill/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  db.User.findById(user.id)
    .then(user => {
      user.profile.skills.standard.pull(req.params.id);
      user.profile.skills.custom.pull(req.params.id);
      return user.save();
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/password', (req, res) => {
  if (!req.body || !req.body.password || !req.body.repassword) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  if (req.body.password !== req.body.repassword) {
    return res.status(400).json({status: 'bad', error: 'Passwords do not match.'});
  }

  const user = req.user;

  const setNewPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }

        db.User.findById(user.id)
          .then(user => {
            user.password = hash;
            return user.save();
          })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  if (user.password) {
    bcrypt.compare(req.body.old_password, user.password, (err, hash) => {
      if (err) {
        return res.status(400).json({status: 'bad', error: err});
      }

      if (!hash) {
        return res.status(400).json({status: 'bad', error: 'Invalid password.'});
      }

      setNewPassword(req.body.password)
        .then(() => {
          res.json({status: 'ok'});
        })
        .catch(err => {
          return res.status(400).json({status: 'bad', error: err});
        });
    });
  } else {
    setNewPassword(req.body.password)
      .then(() => {
        res.json({status: 'ok'});
      })
      .catch(err => {
        return res.status(400).json({status: 'bad', error: err});
      });
  }
});

router.get('/verify', (req, res) => {
  if (!req.query || !req.query.phone) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  if (!/^[0-9]+$/.test(req.query.phone)) {
    return res.status(400).json({status: 'bad', error: 'Invalid phone number.'});
  }

  const user = req.user;
  // const code = Math.random().toString(36).substr(2, 5);
  const code = Math.floor(Math.random() * 9000) + 1000;

  if (user.verified) {
    return res.status(400).json({status: 'bad', error: 'User is already verified.'});
  }

  db.Verification.findOne({user: user.id}, null, {sort: {'created': -1}})
    .then(ver => {
      if (!ver) {
        return;
      }

      if (((new Date) - ver.created) < 3e+5) {
        throw 'You must wait 5 minutes before requesting another confirmation code.'
      }
    })
    .then(() => {
      user.phone = req.query.phone;
      return user.save();
    })
    .then(() => {
      return db.Verification.create({
        user: user.id,
        phone: user.phone,
        code: code,
        active: true
      });
    })
    .then(() => {
      return mailer.send(`+${user.phone}`, `Your Jolt Mate confirmation code is: ${code}`);
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/verify', (req, res) => {
  if (!req.query || !req.body.code) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  const code = req.body.code.toLowerCase();

  if (user.verified) {
    return res.status(400).json({status: 'bad', error: 'User is already verified.'});
  }

  db.Verification.findOne({code: code})
    .populate('user')
    .then(ver => {
      if (!ver || ver.user.phone !== user.phone || !ver.active) {
        throw 'Invalid verification code.';
      }

      ver.user.verified = true;
      return ver.user.save()
        .then(() => {
          ver.active = false;
          return ver.save();
        });
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.get('/:id', (req, res) => {
  const acquaintanceId = req.params.id;
  const user = req.user;

  db.User.findById(acquaintanceId)
    .populate({
      path: 'items',
      populate: {
        path: 'category.category',
        model: 'Category'
      }
    })
    .populate({
      path: 'jobs',
      populate: {
        path: 'industry.industry',
        model: 'Industry'
      }
    })
    .populate({
      path: 'favoritedJobs',
      populate: {
        path: 'industry.industry',
        model: 'Industry'
      }
    })
    .populate('connections')
    .then(acq => {
      return db.User.findById(user.id)
        .then(user => {
          let output = {};
          output.id = acq.id;
          output.profile = acq.profile;

          const connection = acq.profile.public || acq.connections.find(conn => conn.user.toString() === user.id) || acquaintanceId === user.id || user.viewBy.find(u => u.toString() === user.id);

          if (connection) {
            output.items = acq.items;
            output.jobs = acq.jobs;
            output.favoritedJobs = acq.favoritedJobs;
          } else {
            output.items = acq.items.length;
            output.jobs = acq.jobs.length;
            output.favoritedJobs = acq.favoritedJobs.length;
          }

          return output;
        });
    })
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.put('/:id', (req, res) => {
  const user = req.user;
  const acquaintanceId = req.params.id;

  if (acquaintanceId === user.id) {
    return res.status(400).json({status: 'bad', error: 'You can\'t modify the relationship with yourself.'});
  }

  let returnRelationship = '';
  let deviceTokens = [];

  db.User.findById(acquaintanceId)
    .then(acq => {
      if (!acq) {
        throw 'Invalid user ID.';
      }

      deviceTokens = acq.notificationTokens;

      return db.User.findById(user.id)
        .then(me => {

	        if (acquaintanceId === user.id) {
		        throw 'You cannot connect with yourself'
	        }

	        if (friend.check(me,acq,'connected') && friend.check(acq,me,'connected')) {
		        throw 'You are already connected'
	        }

			if (friend.check(acq,me,'requested')) {
				friend.connect(acq,me,'connected')
				friend.connect(me,acq,'connected')

				returnRelationship = 'connected'
			} else if (friend.check(me,acq,'received')) {
				friend.connect(me,acq,'connected')
				friend.connect(acq,me,'connected')

				returnRelationship = 'connected'
			} else {
				friend.connect(me,acq,'requested')
				friend.connect(acq,me,'received')

				returnRelationship = 'requested'
			}

            return me.save()
              .then(() => {
                acq.save();
              })
        })
        .then(() => {
          if (returnRelationship === 'connected') {
	          socket.informFriend('newFriend', user.id, acquaintanceId,  acquaintanceId);
          } else {
	          socket.informFriend('newRequest', user.id, acquaintanceId, acquaintanceId);
          }
        })
        .then(() => {
          res.json({relationship: returnRelationship});
        })
        .then(() => {
	    rewards.redeem(user, Rewards.SEND_REQUEST, () => {

	      });
	    })
        .catch(err => {
          return res.status(400).json({status: 'bad', error: err});
        });
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    })
});

router.delete('/:id', (req, res) => {
  const user = req.user;
  const acquaintanceId = req.params.id;

  if (acquaintanceId === user.id) {
    return res.status(400).json({status: 'bad', error: 'You can\'t modify the relationship with yourself.'});
  }

  db.User.findById(acquaintanceId)
    .then(acq => {
      if (!acq) {
        throw 'Invalid user ID.';
      }

      return db.User.findById(user.id)
        .then(me => {
          const myRelationship = me.connections.find(conn => {
            return conn.user.toString() === acq.id
          });

          if (!myRelationship) {
            throw 'No active relationship with this user.'
          }

          me.connections.pull(myRelationship.id);

          if (me.declinedRequests.indexOf(acq.id) > -1) {

          }
          else {
            if (myRelationship.isForced) {
              me.declinedRequests.push(acq.id);
            }
          }

          if (acq.declinedRequests.indexOf(me.id) > -1) {

          }
          else {
            if (myRelationship.isForced) {
              acq.declinedRequests.push(me.id);
            }
          }

          return me.save()
            .then(() => {
              const relationship = acq.connections.find(conn => {
                return conn.user.toString() === user.id
              });

              acq.connections.pull(relationship.id);


              return acq.save();
            })
        })
        .then(() => {
          res.json({status: 'ok'});
        });
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/:id/publicize', (req, res) => {
  const user = req.user;
  let isPublicized = false;

  db.User.findById(req.params.id)
    .then(acq => {
      if (!acq) {
        throw 'Invalid user ID provided.';
      }

      return db.User.findById(user.id);
    })
    .then(user => {
      if (user.viewBy.find(u => u.toString() === req.params.id)) {
        //throw 'Your profile is already publicized for this user.';
        user.viewBy.pull(req.params.id);
        isPublicized = false;
      }
      else {
        user.viewBy.push(req.params.id);
        isPublicized = true;
      }

      return user.save();
    })
    .then(() => {
      res.json({result: isPublicized});
    })
    .then(() => {
	    socket.informFriend('friendPublicize', user.id, req.params.id,  req.params.id);
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.delete('/:id/publicize', (req, res) => {
  const user = req.user;

  db.User.findById(req.params.id)
    .then(acq => {
      if (!acq) {
        throw 'Invalid user ID provided.';
      }

      return db.User.findById(user.id);
    })
    .then(user => {
      user.viewBy.pull(req.params.id);
      return user.save();
    })
    .then(() => {
      res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/sync', (req, res) => {
  if (!req.body || !req.body.phones) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const user = req.user;
  const phones = req.body.phones;

  db.User.findById(user.id)
    .then(user => {
      async.each(phones, (phone, next) => {
        const enc = crypto.encrypt(phone);

        if (user.contacts.indexOf(enc) > -1) {
          return next();
        }


        db.PendingRequest.find({senderPhone: user.phone, receiverPhone: phone}, function (err, result) {
          db.PendingRequest.create({
            senderPhone: user.phone,
            receiverPhone: phone,
            senderId: user.id
          });
        });

        user.contacts.push(enc);
        next();
      }, () => {
        return user.save();
      });
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});

router.post('/forceconnect', (req, res) => {
  if (!req.body || !req.body.phones) {
    return res.status(400).json({status: 'bad', error: 'Missing required fields.'});
  }

  const me = req.user;
  const phones = req.body.phones;

  const encrypted = crypto.encrypt(me.shortPhone);

  db.User.find({
    'shortPhone': {$in: phones}
  })
    .then(acqs => {
      async.each(acqs, (acq, next) => {
        if (acq.id === me.id) {
          return next();
        }

        if (acq.declinedRequests.indexOf(me.id) > -1) {
          return next();
        }

        if (!me.synced) {
	        let name = me.profile.fullName ? me.profile.fullName : me.phone
	        notification.notify('',name + ' joined Jolt Mate!',acq)

	        if (acq.id == acqs[acqs.length-1].id) {
		        me.synced = true
	        }
        }

        if (acq.contacts.indexOf(encrypted) > -1) {
	        if (!friend.check(me,acq,'connected')) {
				friend.forceConnect(me, acq, 'connected', false);
				socket.informFriend('newFriend', me.id, acq.id,  acq.id);
			}
        } else {
	        if (!friend.check(me,acq,'requested')) {
	          friend.forceConnect(me, acq, 'requested', true);
	          socket.informFriend('newRequest', me.id, acq.id,  acq.id);
          }
        }

        return me.save()
          .then(() => {
            if (acq.contacts.indexOf(encrypted) > -1) {
	          if (!friend.check(acq,me,'connected')) {
		          friend.forceConnect(acq, me, 'connected', false);
				  socket.informFriend('newFriend', acq.id, me.id,  me.id);
	          }
            }
            else {
	          if (!friend.check(acq,me,'received')) {
	              friend.forceConnect(acq, me, 'received', true);
	              socket.informFriend('newRequest', acq.id, me.id,  me.id);
              }
            }
            return acq.save();
          })
          .then(() => {
            next();
          });
      });
    })
    .then(() => {
      return res.json({status: 'ok'});
    })
    .catch(err => {
      return res.status(400).json({status: 'bad', error: err});
    });
});


module.exports = router;
