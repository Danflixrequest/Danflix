const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: String,
  year: String,
  imdbID: String,
  description: String,
  poster: String,
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
