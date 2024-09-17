const express = require('express');
const User = require('../Modules/User/Models/userSchema');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require('dotenv').config();

//------------------Generate OTP in email--------------
exports.generateOTP = async (req, res) => {
    const { email } = req.body;

    const otp = otpGenerator.generate(6, { 
      digits: true,  
      upperCaseAlphabets: false,
      lowerCaseAlphabets:false, 
      specialChars: false 
    });
    console.log(otp);
    
    try {
        await User.findOneAndUpdate({ email, otp });

        // Send OTP via email 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: 'athiraajaykumar2001@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        res.status(200).send('OTP sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending OTP');
    }
};

//------------------Email otp verification------------------

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email,otp);
    
    try {
        const otpRecord = await User.findOne({ otp});
        if (otpRecord) {
            await User.updateOne({ email }, { $set: { isEmailVerified: true } });
            res.status(200).send('OTP verified');
        } else {
            res.status(400).send('Invalid OTP');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying OTP');
    }
};