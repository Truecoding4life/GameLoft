const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String, 
    required: true,
    trim: true
  },
  state: {
    type: String, 
    required: true,
    trim: true
  },
  zip: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  orders: [Order.schema]
});


//bcrypt seed passwords
      const saltRounds = 10;

userSchema.pre('insertMany', async function(next, docs, err) {
  for (let i = 0; i < docs.length; i++) {
    docs[i].password = await bcrypt.hash(docs[i].password, saltRounds);
  }
      console.log("-------------------- This is Doc --------------------");
      console.log(docs);

  next();
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  console.log('this.password', this.password);
  console.log('password', password)
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
