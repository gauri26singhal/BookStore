import React from "react";
import "./apages.scss";
import Navbar from "../Navbar";
import Footer from "../Footer";

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <div className="containerrr">
        <div className="lefty">
          <div className="heading">
            <h1 className="a-h">Welcome to <span className="cool">BookStore</span></h1>
          </div>

          <div className="a-p">
            Welcome to <span className="cool">BookStore</span>, a haven for book lovers and a sanctuary for
            the written word. Founded with a passion for literature, our
            bookstore is dedicated to curating a diverse selection of titles
            that cater to every reader's taste. Our knowledgeable staff is always on hand to provide
            personalized recommendations, ensuring that every visit to our store
            is not just a shopping trip but an enriching experience.
          </div>
          <div className="a-p2">
            At <span className="cool">BookStore</span>, we believe that books have the power to inspire,
            educate, and transform lives. Beyond just selling books, we aim to
            foster a vibrant community of readers through engaging events, book
            clubs, and author signings. Join us
            on this literary journey, and let's celebrate the joy of reading
            together! Feel free to customize the name of your bookstore and any
            specific details to better reflect your vision!
          </div>
        </div>
        <div className="righty">
          <img src="books.png" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
