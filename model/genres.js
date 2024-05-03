const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genresSchema = new Schema({
  genre: {
    type: String, 
    required:true// Assuming you want genre to be a single string
  }
});

module.exports = mongoose.model('Genre', genresSchema);
