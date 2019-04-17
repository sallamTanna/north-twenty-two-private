const db = require('../models/db');

const getAllWatches = (req, res) => {
  db.Watch.find()
   .then(response => res.send( {response:response, status:"ok"} ))
   .catch(error => res.send({ response:err, status:"error" }))
};

module.exports = { getAllWatches };
