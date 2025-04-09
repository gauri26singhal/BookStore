import React, { useEffect } from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import BookDetails from "./components/BookDetails";
import Results from "./components/Results";
import booksData from "../public/list.json";
import Navbar from "./components/Navbar";
import PaymentPage from "./components/PaymentPage";
import Reciept from "./components/Reciept";
import OrdersPage from "./components/OrdersPage";

function App() {
  const [authUser] = useAuth(); // Use the authenticated user state

  // Dynamically add Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar books={booksData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/store"
            element={authUser ? <Courses /> : <Navigate to="/signup" />} // Redirect if not authenticated
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />} // Redirect to home if user is logged in
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/results" element={<Results />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/reciept/:userId" element={<Reciept />} />
          <Route path="/orders" element={authUser ? <OrdersPage /> : <Navigate to="/signup" />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
