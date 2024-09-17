const mongoose = require('mongoose');
const { validateMovie } = require('../Requests/movieValidation'); 

// Movie Schema
const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  languages: { type: [String], required: true },
  release: { type: String, required: true },
  duration: { type: String, required: true },
  certification: { type: String, required: true },
  synopsis: { type: String, required: true },
  poster: { type: String, required: true },
});

// Static method to validate movie data
MovieSchema.statics.validateMovieData = (movieData) => {
  const { error } = validateMovie(movieData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const Movie = mongoose.model('movies', MovieSchema);
module.exports = Movie;
