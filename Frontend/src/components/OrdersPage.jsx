// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrdersPage = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         const userData = localStorage.getItem("Users");
//         if (userData) {
//             const parsedUserData = JSON.parse(userData);
//             setUserId(parsedUserData._id);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (userId) {
//                 try {
//                     const response = await axios.get(`http://localhost:4001/api/payment/user/${userId}/orders`);
//                     setOrders(response.data);
//                 } catch (error) {
//                     console.error("Error fetching orders:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchOrders();
//     }, [userId]);

//     if (loading) return <p>Loading your orders...</p>;

//     return (
//         <div>
//             <h2>Your Orders</h2>
//             {orders.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Book Name</th>
//                             <th>Amount</th>
//                             <th>Status</th>
//                             <th>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map(order => (
//                             <tr key={order._id}>
//                                 <td>{order._id}</td>
//                                 <td>{order.book_name}</td>
//                                 <td>{order.transaction_details}</td> 
//                                 <td>{order.status || "Completed"}</td> 
//                                 <td>{new Date(order.date).toLocaleString()}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No orders found.</p>
//             )}
//         </div>
//     );
// };

// export default OrdersPage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("Users");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData._id);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:4001/api/payment/user/${userId}/orders`);
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h2 className="text-xl font-semibold mb-2 md:mb-0 text-gray-900 dark:text-gray-100">{order.book_name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">Order ID: {order._id}</p>
                </div>
                <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Amount: {order.transaction_details}</p>
                  <p className="text-gray-600 dark:text-gray-400">Status: {order.status || "Completed"}</p>
                  <p className="text-gray-600 dark:text-gray-400">Date: {new Date(order.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No orders found.</p>
      )}
      <div className="mt-12 text-center">
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrdersPage;