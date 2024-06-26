const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
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
    ref: "User",
  },
});


module.exports = Review;
