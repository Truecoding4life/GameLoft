const mongoose = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const productSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true, // Auto-generate ObjectId
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category:
  {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
  ,
  likes: {
    type: Number,
    default: 0,
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  rating: [
    {
      type: Number,
      min:0,
      max:5,
    }
  ],
  discounted_price:{
    type: Number,
    max: this.price,
    default: 0
  
  },
  reviews: [{
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  }]

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
