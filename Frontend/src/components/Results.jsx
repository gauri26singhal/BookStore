import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cards from "./Cards";

function Results() {
  const location = useLocation();
  const { filteredBooks } = location.state || { filteredBooks: [] };

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-20 p-6">
      <h1 className="text-2xl md:text-4xl text-center mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item) => (
            <Link to={`/book/${item.id}`} key={item.id} state={item}>
              <Cards item={item} />
            </Link>
          ))
        ) : (
          <p className="text-center h-screen">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Results;
