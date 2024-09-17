// Theatre controller
const express = require('express');
const Theatre = require('../Models/Theatre');

exports.registerTheatre = async (req, res) => {
  const { error } = validateTheatre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.status(201).send('Theatre registered successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get all theatres
exports.getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (error) {
    console.error('Error fetching theatres:', error);
    res.status(500).send('Server Error');
  }
};

// delete theatre
exports.deleteTheatre = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTheatre = await Theatre.findByIdAndDelete(id);
    if (!deletedTheatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }
    res.status(200).json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Theatre', error });
  }
}; 

// Edit Theatre data
exports.EditTheatre = async (req, res) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTheatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }
    res.json(updatedTheatre);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update theatre' });
  }
};