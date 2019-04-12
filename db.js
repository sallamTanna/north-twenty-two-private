const config = require('config');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(config.get('mongo.uri'))
mongoose.set('debug', config.get('app.verbose') === true);
mongoose.Promise = require('bluebird');

function autoPopulateAllFields(schema) {
    var paths = '';
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname=='_id') return;
        if (schemaType.options.ref)
            paths += ' ' + pathname;
    });

    schema.pre('find', handler);
    schema.pre('findOne', handler);

    function handler(next) {
        this.populate(paths);
        next();
    }
};

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  phone: String,
  shortPhone: String,
  password: String,
  profile: {
    email: String,
    fullName: String,
    username: String,
    address: {
      city: {type: String, default: 'Unknown'},
      state: String,
      country: String,
      zip: String,
    },
    photos: String,
    summary: String,
    resume: String,
    resumeFile: String,
    experiences: [{
      title: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    educations: [{
      school: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    skills: {
      standard: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
      custom: [{name: String}]
    },
    points: {type: Number, default: 0},
    totalPoints: {type: Number, default: 0},
    hidden: {type: Boolean, default: false},
    public: {type: Boolean, default: true},
    countryCode: String,
  },
  location: {type: [Number], index: '2d'},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}],
  news: [{type: Schema.Types.ObjectId, ref: 'News'}],
  conversations: [{type: Schema.Types.ObjectId, ref: 'Conversation'}],
  viewBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
  level: {type: Number, default: 1},
  verified: {type: Boolean, default: false},
  notificationTokens: [{type: String}],
  connections: [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    relationship: {type: String, enum: ['requested', 'received', 'connected']},
    isForced: {type: Boolean, default: false}
  }],
  declinedRequests: [String],
  jobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
  favoritedJobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
  sharedJobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
  viewedJobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
  favoritedItems: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  sharedItems: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  viewedItems: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  actions: [{type: Schema.Types.ObjectId, ref: 'Action'}],
  incentives: [{type: Schema.Types.ObjectId, ref: 'Incentive'}],
  contacts: [String],
  synced: {type: Boolean, default: false}
}

);

//UserSchema.plugin(autoPopulateAllFields);

exports.User = mongoose.model('User', UserSchema);

exports.Verification = mongoose.model('Verification', new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  phone: String,
  code: String,
  active: Boolean,
  created: {type: Date, default: Date.now()}
}));

exports.Forgot = mongoose.model('Forgot', new Schema({
  phone: String,
  code: String,
  active: Boolean
}));

exports.Skill = mongoose.model('Skill', new Schema({
  name: String
}));

exports.Category = mongoose.model('Category', new Schema({
  name: String,
  subCategory: [{name: String}]
}));

exports.Item = mongoose.model('Item', new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  photos: [String],
  description: String,
  price: String,
  category: {
    category: String,
    subCategory: String
  },
  zip: String,
  city: {type: String, default: 'Unknown'},
  country: String,
  location: {type: [Number], index: '2d'},
  created: {type: Date, default: Date.now()},
  favoritedBy: [String],
  sharedBy: [String],
  joltedBy: [String],
  offeredBy: [String]
}));

exports.Industry = mongoose.model('Industry', new Schema({
  name: String,
  subIndustry: [{name: String}]
}));


//fvddfffffffffffffffffffffff
exports.Job = mongoose.model('Job', new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  company: String,
  jobTitle: String,
  industry: {
    industry: String,
    subIndustry: String
  },
  skills: [String],
  type: {type: String, enum: ['full-time', 'contract', 'part-time', 'internship', 'freelance']},
  description: String,
  salary: String,
  salaryType: String,
  contact: String,
  zip: String,
  city: {type: String, default: 'Unknown'},
  country: String,
  created: {type: Date, default: new Date()},
  favoritedBy: [String],
  sharedBy: [String],
  appliedBy: [String],
  joltedBy: [String]
}));

exports.Conversation = mongoose.model('Conversation', new Schema({
  participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
  date: {type: Date, default: Date.now()}
}));

exports.Message = mongoose.model('Message', new Schema({
  conversation: {type: Schema.Types.ObjectId, ref: 'Conversation'},
  sender: {type: Schema.Types.ObjectId, ref: 'User'},
  content: String,
  created: {type: Date, default: Date.now()}
}));

exports.Blog = mongoose.model('Blog', new Schema({
  poster: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  content: String,
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created: {type: Date, default: Date.now()}
}));

exports.News = mongoose.model('News', new Schema({
  poster: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  content: String,
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created: {type: Date, default: Date.now()}
}));

exports.Incentive = mongoose.model('Incentive', new Schema({
  goal: Number,
  reward: String,
  actions: [{type: Schema.Types.ObjectId, ref: 'Action'}]
}));

exports.Action = mongoose.model('Action', new Schema({
  reward: Number,
  description: String,
  incentive: {type: Schema.Types.ObjectId, ref: 'Incentive'}
}));

exports.Redeemed = mongoose.model('Redeemed', new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  reward: {type: Schema.Types.ObjectId, ref: 'Incentive'},
}));

exports.PendingRequest = mongoose.model('PendingRequest', new Schema({
  senderPhone: String,
  receiverPhone: String,
  senderId: String
}));
