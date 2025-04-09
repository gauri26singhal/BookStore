// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Courses() {
//   const [book, setBook] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getBook = async () => {
//       try {
//         const res = await axios.get("http://localhost:4001/book");
//         console.log(res.data);
//         setBook(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getBook();
//   }, []);

//   const handleCardClick = (item) => {
//     navigate(`/book/${item.id}`, { state: item });
//   };

//   return (
//     <>
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
//         <div className="pt-14 mt-16 items-center justify-center text-center">
//           <h1 className="text-2xl md:text-4xl">
//             We're delighted to have you{" "}
//             <span className="text-pink-500"> Here! :)</span>
//           </h1>
//           <p className="mt-12">
//             Explore our wide range of books and find your next great read. From
//             classics to the latest bestsellers, we have something for every
//             taste and interest.
//           </p>
//           <Link to="/">
//             <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
//               Back
//             </button>
//           </Link>
//         </div>
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
//           {book.map((item) => (
//             <Cards key={item.id} item={item} handleCardClick={handleCardClick} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Courses;
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Courses() {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [theme, setTheme] = useState("light"); // State to track theme
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
        setSortedBooks(res.data); // Initially sortedBooks is the same as books
        console.log(localStorage.getItem("Users"));
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();

    // Fetch theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme ? savedTheme : "light");
  }, []);

  // Sorting logic based on price or other criteria
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedArray = [...books];
    if (option === "priceLowToHigh") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighToLow") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (option === "name") {
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    }
    setSortedBooks(sortedArray);
  };

  const handleCardClick = (item) => {
    navigate(`/book/${item.id}`, { state: item });
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="pt-14 mt-16 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            Explore our wide range of books and find your next great read. From
            classics to the latest bestsellers, we have something for every
            taste and interest.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* Sorting Dropdown */}
        <div className="mt-8 flex justify-end">
          <select
            className={`p-2 border rounded-md ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-gray-200 text-black border-gray-300"
            }`}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Sort by</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {/* Display sorted books */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {sortedBooks.map((item) => (
            <Cards key={item.id} item={item} handleCardClick={handleCardClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
