const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [50, "Title cannot be more than 50 characters"],
  },
  link: {
    type: String,
    required: [true, "Please add a link"],
    trim: true,
    maxlength: [80, "Url cannot be more than 80 charactes"],
    match: [
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "Please add a valid URL",
    ],
  },
  type: {
    type: String,
    enum: ["ig", "fb", "in", "tw", "tk", "link"],
    required: [true, "Please select the type"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: [
    {
      date: Date,
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Link", LinkSchema);
