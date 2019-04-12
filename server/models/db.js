const mongoose =  require ('mongoose');
const config = require ('./config/development.json');
const Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/north-twenty-two',  { useNewUrlParser: true })

//To check if we connected to the database or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('We are connected to the Mongo database :)');}
);


exports.Watch = mongoose.model('Watch', new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  price: Number,
  description: String,
  imgs_src: [ String ],
  available_colors: [ String ],
  dimensions: String,
  speceficationa: String,
  more_info: String,
}));

 
