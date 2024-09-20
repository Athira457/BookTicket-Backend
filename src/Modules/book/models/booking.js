// models/Booking.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  movieName: {
    type: String,
    required: true,
  },
  theatre: {
    type: String,
    required: true,
  },
  seats: {
    type: [String], 
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model('Book', bookingSchema);

module.exports = Book;
