const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay instance with API keys
const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,   
    key_secret: process.env.KEY_SECRET,  
});
 
exports.createOrder = async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,  
            currency: "INR",
            receipt: "receipt#1",  
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return res.status(500).send("Some error occurred");
        }

        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Handle Razorpay payment verification
exports.verifyPayment = (req, res) => {
    const crypto = require('crypto');   
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;   
    const key_secret = process.env.KEY-SECRET;  

    const shasum = crypto.createHmac('sha256', key_secret);
    shasum.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
        res.json({ status: "success", message: "Payment verified successfully" });
    } else {
        res.status(400).json({ status: "failure", message: "Payment verification failed" });
    }
};
