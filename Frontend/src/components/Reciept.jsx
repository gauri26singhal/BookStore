import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas-pro"; // or 'html2canvas-pro' if you installed it
import jsPDF from "jspdf";
import { Link } from "react-router-dom";

const Receipt = () => {
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("Users");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUserId(parsedUserData._id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.error("User not found in local storage.");
    }
  }, []);

  useEffect(() => {
    const fetchLastPayment = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:4001/api/payment/user/${userId}/last`
          );
          setLastPayment(response.data);
        } catch (error) {
          console.error("Error fetching last payment:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLastPayment();
  }, [userId]);

  const downloadReceipt = () => {
    html2canvas(receiptRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Use 'p' for portrait orientation
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${lastPayment.book_name}-reciept.pdf`);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full" ref={receiptRef}>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
              Receipt
            </div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              Payment Details
            </h2>
            {lastPayment ? (
              <div className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <InfoItem
                    label="User Name"
                    value={lastPayment.user.fullname}
                  />
                  <InfoItem label="User Email" value={lastPayment.user.email} />
                  <InfoItem label="Book Name" value={lastPayment.book_name} />
                  <InfoItem
                    label="Transaction ID"
                    value={lastPayment.razorpay_payment_id}
                  />
                  <InfoItem
                    label="Delivery Address"
                    value={lastPayment.delivery_address}
                  />
                  <InfoItem
                    label="Date"
                    value={new Date(lastPayment.date).toLocaleString()}
                  />
                  <InfoItem
                    label="Contact"
                    value="For more queries contact at: 9618131376"
                  />
                </div>
              </div>
            ) : (
              <p className="mt-2 text-gray-500">
                No payments found for this user.
              </p>
            )}
          </div>
        </div>
      </div>
      {lastPayment && (
        <div className="mt-6 text-center">
          <button
            onClick={downloadReceipt}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Download Receipt
          </button>
        </div>
      )}
      <div className="mt-12 text-center">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="border-b border-gray-200 py-2">
    <span className="text-gray-600 text-sm">{label}:</span>
    <span className="ml-2 text-black font-medium">{value}</span>
  </div>
);

export default Receipt;
