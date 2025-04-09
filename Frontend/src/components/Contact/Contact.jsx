import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./pages.scss";
import Footer from "../Footer";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const userid = "service_els9uof";
  const templateid = "template_3vixahq";
  const myapi = "s8xUj1r66jfiPRbqZ";

  const form = useRef();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [theme, setTheme] = useState("light"); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme ? savedTheme : "light");
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    emailjs.sendForm(userid, templateid, form.current, myapi).then(
      (result) => {
        e.target.reset();
        alert("Message sent successfully!");
      },
      (error) => {
        alert("Something went wrong! Try again after some time.");
      }
    );
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setIsValidEmail(/\S+@\S+\.\S+/.test(enteredEmail));
  };

  return (
    <div className="contact form">
      <Navbar />
      <br />
      <form ref={form} onSubmit={sendEmail} className="z">
        <div className="containerr">
          <div className="left">
            <div className="pic-con">
              <img src="contact.png" alt="img" />
            </div>
          </div>
          <div className="right">
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="user_name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className={`input ${theme === "dark" ? "dark-input text-black" : ""}`}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_email">Email:</label>
                <input
                  type="text"
                  name="user_email"
                  className={`input ${!isValidEmail ? "invalid" : ""} ${theme === "dark" ? "dark-input text-black" : ""}`}
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  className={`input ${theme === "dark" ? "dark-input text-black" : ""}`}
                  name="message"
                  placeholder="Enter your message"
                  required
                />
              </div>

              <center>
                <input type="submit" value="Send" className="btn" />
              </center>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Contact;
