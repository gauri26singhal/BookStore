import express from 'express';
import Razorpay from 'razorpay';
import 'dotenv/config.js';
import crypto from 'crypto';
import Payment from '../model/Payment.js';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
}); 

const router = express.Router();

// ROUTE 1 : Create Order API Using POST Method
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100), // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// ROUTE 2 : Verify Payment API Using POST Method
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, book_name, transaction_details, delivery_address } = req.body;

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Check authenticity
        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                user,
                book_name,
                transaction_details,
                delivery_address
            });

            // Save Payment 
            await payment.save();

            // Send success message 
            res.json({
                message: "Payment Successfully"
            });
        } else {
            res.status(400).json({ message: "Invalid Signature!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// ROUTE 3 : Get Last Payment by User ID
router.get('/user/:userId/last', async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

    try {
        const lastPayment = await Payment.findOne({ user: userId }) // Use userId here
            .sort({ date: -1 }) // Sort by date in descending order
            .populate('user', 'fullname email'); // Populate user details

        if (!lastPayment) {
            return res.status(404).json({ message: "No payments found for this user." });
        }

        res.status(200).json(lastPayment);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});


// ROUTE 4 : Get All Payments by User ID
router.get('/user/:userId/orders', async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

    try {
        const orders = await Payment.find({ user: userId }) // Use userId here
            .sort({ date: -1 }) // Sort by date in descending order
            .populate('user', 'fullname email'); // Populate user details

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});


export default router;