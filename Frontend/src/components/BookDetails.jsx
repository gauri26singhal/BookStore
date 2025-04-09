// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function BookDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Destructure book from location.state with a fallback
//   const book = location.state || null;

//   const handleBackClick = () => {
//     navigate("/");
//   };

//   // Scroll to top when the component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // If book is not available, show a message
//   if (!book) {
//     return (
//       <>
//         <Navbar />
//         <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mb-8">
//           <h1 className="text-3xl font-bold text-center mt-28">Book Not Found</h1>
//           <p className="text-md text-center mb-4">The book you are looking for does not exist.</p>
//           <div className="text-center mb-4">
//             <button className="btn btn-primary" onClick={handleBackClick}>
//               Back to Home
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mb-8">
//         <div className="mt-28 flex flex-col items-center">
//           <div className="w-full md:w-1/2 mb-8 flex justify-center">
//             <img 
//               src={book.image} 
//               alt={book.name} 
//               className="h-auto" 
//               style={{ maxWidth: '50%' }} 
//             />
//           </div>
//           <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
//             {book.name}
//           </h1>
//           <div className="text-lg text-center mb-2">
//             <span className="badge badge-outline p-6">{book.category}</span>
//           </div>
//           <p className="text-md text-center mb-2 font-semibold">{book.author}</p> {/* Added author name */}
//           <p className="text-md text-center mb-2">{book.publication}</p> {/* Added publication name */}
//           <p className="text-md text-center mb-4">{book.title}</p>
//           <div className="text-center mb-4">
//             <div className="badge badge-outline p-6">${book.price}</div>
//           </div>
//           <div className="text-center mb-4">
//             <button className="btn btn-secondary mr-2">Buy Now</button>
//             <button className="btn btn-primary" onClick={handleBackClick}>
//               Back
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default BookDetails;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-hot-toast"; // Add for notifications
import axios from "axios"; // Add for API calls


function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure book from location.state with a fallback
  const book = location.state || null;

  const handleBackClick = () => {
    navigate("/");
  };

  // const handleBuyNow = async () => {
  //   try {
  //     const { data } = await axios.post("http://localhost:4001/api/payment/order", {
  //       amount: book.price, // Pass the book price for payment
  //     });

  //     const { amount, id: order_id, currency } = data.data;

  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //       amount: amount,
  //       currency: currency,
  //       name: "Bookstore",
  //       description: "Purchase Book",
  //       order_id: order_id,
  //       handler: async (response) => {
  //         const verifyUrl = "http://localhost:4001/api/payment/verify";
  //         const { data } = await axios.post(verifyUrl, {
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature,
  //         });

  //         toast.success("Payment successful!");
  //         navigate("/");
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     toast.error("Payment failed. Please try again.");
  //     console.log(error);
  //   }
  // };

  // Scroll to top when the component mounts
  
  const handleBuyNow = () => {
    navigate("/payment", { state: { book } }); // Pass book details to PaymentPage
};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  // If book is not available, show a message
  if (!book) {
    return (
      <>
        <Navbar />
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mb-8">
          <h1 className="text-3xl font-bold text-center mt-28">Book Not Found</h1>
          <p className="text-md text-center mb-4">The book you are looking for does not exist.</p>
          <div className="text-center mb-4">
            <button className="btn btn-primary" onClick={handleBackClick}>
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mb-8 p-6">
        <div className="mt-28 flex flex-col items-center">
          <div className="w-full md:w-1/2 mb-8 flex justify-center">
            <img 
              src={book.image} 
              alt={book.name} 
              className="h-auto" 
              style={{ maxWidth: '50%' }} 
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            {book.name}
          </h1>
          <div className="text-lg text-center mb-2">
            <span className="badge badge-outline p-6">{book.category}</span>
          </div>
          <p className="text-md text-center mb-2 font-semibold">{book.author}</p>
          <p className="text-md text-center mb-2">{book.publication}</p>
          <p className="text-md text-center mb-4">{book.title}</p>
          <div className="text-center mb-4">
            <div className="badge badge-outline p-6">₹{book.price}</div>
          </div>
          <div className="text-center mb-4">
            <button className="btn btn-secondary mr-2" onClick={handleBuyNow}>Buy Now</button>
            <button className="btn btn-primary" onClick={handleBackClick}>
              Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetails;
