const mongoose =  require ('mongoose');
const config = require ('./config/development.json');
const Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/north-twenty-two',  { useNewUrlParser: true })

//To check if we connected to the database or not
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('We are connected to the Mongo database :)');}
);

exports.Watch = mongoose.model('Watch', new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  price: Number,
  src: String,
  gender: String,
  summary: String,
  description: String,
  imgs_src: [ String ],
  available_colors: [ String ],
  dimensions: String,
  specefications: String,
  more_info: String,
}));

exports.Post = mongoose.model('Post', new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  date: Date,
  img: String,
}));

exports.Wristband = mongoose.model('Wristband', new Schema({
  name: String,
  price: Number,
  src: String,
  gender: String,
  summary: String,
  description: String,
  imgs_src: [ String ],
  available_colors: [ String ],
  dimensions: String,
  specefications: String,
  more_info: String,
}));
