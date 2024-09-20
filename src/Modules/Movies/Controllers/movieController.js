const express = require('express');
const Movie = require('../Models/Movies');
const ShowTime = require('../../showTime/Models/Show')

// Add a new Movie
exports.createMovie =  async (req, res) => {
    const {  name, genre, languages, release, duration, certification, synopsis} = req.body;
    const poster = req.file ? req.file.filename : null;
  try {  
    const newMovie = new Movie({ name, genre, languages, release, duration, certification, synopsis, poster });
    await newMovie.save();
    res.status(201).json({ message: 'Movie registered successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
}

// Get all Movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Server Error');
  }
};

//Get movie by id
exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// delete movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("Movie ID: ", id); 
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Movie', error });
  }
}; 

// Edit Movie data
exports.EditMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie' });
  }
};

// get show timings by movie id 
exports.getShowDetails = async (req, res) => {
  const { id } = req.params; 
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const movieName = movie.name;
    const shows = await ShowTime.find({ movie: movieName });

    if (shows.length === 0) {
      return res.status(404).json({ message: 'No shows found for this movie' });
    }
    res.status(200).json({ movieTitle: movieName, shows });
  } catch (error) {
    console.error('Error fetching movie or show details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


