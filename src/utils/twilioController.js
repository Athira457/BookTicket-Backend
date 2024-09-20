const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TwILIO_PHONE;
const client = twilio(accountSid, authToken);

exports.sendWhatsAppMessage = async (req, res) => {
    const { movieName, theatre, seats, time, date, totalPrice, phoneNumber } = req.body;

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
            from: twilioPhoneNumber, 
            to: `whatsapp:${phoneNumber}` 
        });

        res.status(200).json({ success: true, response });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).json({ success: false, error });
    }
};


