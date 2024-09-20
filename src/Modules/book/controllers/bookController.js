// book details controller
const express = require('express');
const twilio = require('twilio');
require('dotenv').config();
const Book = require('../models/booking'); 

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send WhatsApp message
const sendWhatsAppMessage = async (movieName, theatre, seats, time, date, totalPrice) => {
  const message = `
    🎬 Movie: ${movieName}
    📍 Theatre: ${theatre}
    🪑 Seats: ${seats.join(', ')}
    ⏰ Time: ${time}
    📅 Date: ${new Date(date).toLocaleDateString()}
    💰 Total Price: Rs. ${totalPrice}
  `;

  try {
    const response = await client.messages.create({
      body: message,
     from: 'whatsapp:+14155238886',
      to: 'whatsapp:+919747792278'
    });
    
    return { success: true, response };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return { success: false, error };
  }
};

// Booking API Endpoint
exports.bookingDetails = async (req, res) => {
  const { movieName, theatre, seats, time, date, totalPrice, phoneNumber } = req.body;

  try {
    // Save booking details to the database
    const newBook = new Book({
      movieName,
      theatre,
      seats,
      time,
      date,
      totalPrice,
    });

    await newBook.save();

    // Send WhatsApp message with booking details
    const whatsappResponse = await sendWhatsAppMessage(movieName, theatre, seats, time, date, totalPrice);


    if (whatsappResponse.success) {
      res.status(201).json({ message: 'Booking details uploaded and WhatsApp message sent', whatsappResponse });
    } else {
      res.status(201).json({ message: 'Booking details uploaded but WhatsApp message failed', whatsappResponse });
    }

  } catch (err) {
    console.error('Error during booking:', err);
    res.status(500).json({ message: 'Error uploading booking details', error: err });
  }
};


exports.confirmBook = async (req, res) =>  {
    try {
      // Fetch the most recent booking
      const latestBooking = await Book.findOne().sort({ createdAt: -1 });
  
      if (!latestBooking) {
        return res.status(404).json({ message: 'No booking found' });
      }
      
      res.status(200).json(latestBooking);
    } catch (error) {
      console.error('Error fetching latest booking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
