const db = require('../models/db');

const getAllPosts = (req, res) => {
  db.Post.find()
   .then(response => res.send( {response:response, status:"ok"} ))
   .catch(error => res.send({ response:err, status:'error' }))
};

module.exports = { getAllPosts };
