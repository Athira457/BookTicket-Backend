const Theatre = require('../Models/Theatre');

class TheatreRepository {
  // Register a new theatre
  async createTheatre(theatreData) {
    try {
      const newTheatre = new Theatre(theatreData);
      return await newTheatre.save();
    } catch (error) {
      throw new Error('Error creating theatre: ' + error.message);
    }
  }

  
  // Get all theatres
  async getAllTheatres() {
    try {
      return await Theatre.find();
    } catch (error) {
      throw new Error('Error fetching theatres: ' + error.message);
    }
  }

  // Get a theatre by ID
  async getTheatreById(id) {
    try {
      return await Theatre.findById(id);
    } catch (error) {
      throw new Error('Error fetching theatre by ID: ' + error.message);
    }
  }

  // Update a theatre by ID
  async updateTheatre(id, updateData) {
    try {
      const updatedTheatre = await Theatre.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedTheatre) {
        throw new Error('Theatre not found');
      }
      return updatedTheatre;
    } catch (error) {
      throw new Error('Error updating theatre: ' + error.message);
    }
  }

  // Delete a theatre by ID
  async deleteTheatre(id) {
    try {
      const deletedTheatre = await Theatre.findByIdAndDelete(id);
      if (!deletedTheatre) {
        throw new Error('Theatre not found');
      }
      return deletedTheatre;
    } catch (error) {
      throw new Error('Error deleting theatre: ' + error.message);
    }
  }
}

module.exports = new TheatreRepository();
