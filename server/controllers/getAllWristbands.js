const db = require('../models/db');

const getAllWristbands = (req, res) => {
  db.Wristband.find()
   .then(response => res.send( {response:response, status:"ok"} ))
   .catch(error => res.send({ response:err, status:"error" }))
};

module.exports = { getAllWristbands };
