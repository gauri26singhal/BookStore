import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book || null;
  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem("Users");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUserId(parsedUserData._id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handlePayment = async () => {
    if (!address) {
      toast.error("Please enter your delivery address.");
      return;
    }

    if (!userId) {
      toast.error("User not found. Please log in.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:4001/api/payment/order", {
        amount: book.price,
      });

      const { amount, id: order_id, currency } = data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Bookstore",
        description: "Purchase Book",
        order_id: order_id,
        handler: async (response) => {
          const verifyUrl = "http://localhost:4001/api/payment/verify";
          try {
            await axios.post(verifyUrl, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user: userId,
              book_name: book.name,
              transaction_details: `Amount Paid: ₹${book.price}`,
              delivery_address: address,
            });

            toast.success("Payment successful!");
            navigate(`reciept/${userId}`);
          } catch (error) {
            toast.error("Payment verification failed.");
            console.error("Verification Error:", error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Complete Your Purchase</h1>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Book Details</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{book?.name}</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">Price: ₹{book?.price}</p>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Delivery Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-black"
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <button
            onClick={handlePayment}
            className="w-full bg-[#ff00d3] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Pay ₹{book?.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;