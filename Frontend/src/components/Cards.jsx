import React from "react";

function Cards({ item, handleCardClick }) {
  return (
    <div className="mt-4 my-3 p-3">
      <div
        className="card w-92 bg-base-100 shadow-xl blah hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border cursor-pointer"
        onClick={() => handleCardClick(item)}
      >
        <figure className="h-48 overflow-hidden"> {/* Fixed height for image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover" // Ensure the image covers the container
          />
        </figure>
        <div className="card-body h-96 border border-white-2"> {/* Fixed height for card body */}
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary p-4">{item.category}</div>
          </h2>
          <p className="text-md ">{item.author}</p> {/* Added author name */}
          <p className="text-md ">{item.publication}</p> {/* Added publication name */}
          <p className="text-md ">{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">₹{item.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
