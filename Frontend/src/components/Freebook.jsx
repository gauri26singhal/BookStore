import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

function Freebook() {
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const data = res.data.filter((data) => data.category)
        .slice(0, 6);
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const handleCardClick = (item) => {
    navigate(`/book/${item.id}`, { state: item });
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Explore Books</h1>
          <p>
            Discover our selection of free books available for you to enjoy.
            Whether you're looking for classics or contemporary works, we have
            something for every reader.
          </p>
        </div>

        <div className="pt-10">
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} handleCardClick={handleCardClick} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Freebook;