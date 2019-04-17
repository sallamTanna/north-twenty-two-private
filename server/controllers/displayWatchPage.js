const db = require('../models/db');

const displayWatchPage = (req, res) => {
  db.Watch.findById(req.body.watchId)
   .then(response => res.send( {response:response, status:"ok"} ))
   .catch(error => res.send({ response:err, status:'error' }))
};

module.exports = { displayWatchPage };
