import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const BookCard = ({ book }) => {
  return (
    <div
      className="block mx-auto max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md"
    >
      <div className="whitebg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col rounded-2xl overflow-hidden">
        
        {/* Book Image */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={book.image || "/placeholder-book.png"}
            alt={book.bookName}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Book Info */}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl w-40 font-semibold text-secondary truncate">
            {book.bookName}
          </h2>
          <p className="text-[16px] w-40 description truncate">{book.author}</p>
          <p className="description text-sm line-clamp-2">{book.review || "No review available."}</p>

          <div className="flex justify-between items-center mt-2">
            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <FaStar className="w-4 h-4" />
              {book.rating || "N/A"}
            </div>
            {/* Price */}
            <p className="font-bold text-red-600 text-sm">${book.price}</p>
          </div>

          {/* Status & Button */}
          <div className="flex justify-between items-center mt-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.status === "publish" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {book.status === "publish" ? "Available" : "Unavailable"}
            </span>

            <div className="btn-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
              <Link to={`/book/${book._id}`} className="w-full block">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
