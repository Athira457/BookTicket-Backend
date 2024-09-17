const ShowTime = require('../Models/ShowTime');

// Create a new show time
exports.createShowTime = async (req, res) => {
  const { theatre, movie, date, time } = req.body;

  try {
    const newShowTime = new ShowTime({    
      theatre,
      movie,
      date,
      time,
    });

    await newShowTime.save();
    res.status(201).json({ message: 'Show time registered successfully!' });
  } catch (error) {
    console.error('Error registering show time:', error);
    res.status(500).json({ message: 'Server error while registering show time' });
  }
};

// Fetch all show times
exports.getAllShowTimes = async (req, res) => {
  try {
    const showTimes = await ShowTime.find();
    res.status(200).json(showTimes);
  } catch (error) {
    console.error('Error fetching show times:', error);
    res.status(500).json({ message: 'Server error while fetching show times' });
  }
};

// Delete a show by ID
exports.deleteShow = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShow = await ShowTime.findByIdAndDelete(id);
    if (!deletedShow) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.status(200).json({ message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete show', error });
  }
};

// Edit show time 
exports.EditShow = async (req, res) => {
  try {
    const updatedShow = await ShowTime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShow) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.json(updatedShow);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update show' });
  }
};
