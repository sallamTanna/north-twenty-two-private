const db = require('../models/db');

const test = (req, res) => {

db.Watch.insert( {name:'eeeeeee'} )
  .then(response => console.log('ffffffff', response))
 .catch(err => console.log('this is the err ', err));


};


module.exports = { test };
