
// models/Payment.js
import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
// import  User  from"./user.model";

const PaymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    book_name: {
        type: String,
        required: true,
    },
    transaction_details: {
        type: String,
        required: true,
    },
    delivery_address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

export default model('Payment', PaymentSchema);