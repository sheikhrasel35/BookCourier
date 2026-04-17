import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import BookCard from "../../components/BookCard/BookCard";
import { FaFilter } from "react-icons/fa";

const AllBooks = () => {
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, sort, filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  const [categoryFilters, setCategoryFilters] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [reviewFilter, setReviewFilter] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // Fetch books
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/books")
      .then((res) => {
        setBooks(res.data);

        // Set dynamic price range based on all books
        if (res.data.length > 0) {
          const prices = res.data.map((b) => b.price);
          setMinPrice(Math.min(...prices));
          setMaxPrice(Math.max(...prices));
          setPriceFilter({ min: Math.min(...prices), max: Math.max(...prices) });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  const categories = [...new Set(books.map((b) => b.category))];

  // Toggle category
  const handleCategoryChange = (category) => {
    if (categoryFilters.includes(category)) {
      setCategoryFilters(categoryFilters.filter((c) => c !== category));
    } else {
      setCategoryFilters([...categoryFilters, category]);
    }
  };

  // Toggle review stars
  const handleReviewChange = (stars) => {
    if (reviewFilter.includes(stars)) {
      setReviewFilter(reviewFilter.filter((s) => s !== stars));
    } else {
      setReviewFilter([...reviewFilter, stars]);
    }
  };

  // Apply filters
  const filteredBooks = books
    .filter((book) =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) =>
      categoryFilters.length > 0 ? categoryFilters.includes(book.category) : true
    )
    .filter(
      (book) =>
        book.price >= priceFilter.min &&
        book.price <= (priceFilter.max === Infinity ? maxPrice : priceFilter.max)
    )
    .filter((book) =>
      reviewFilter.length > 0
        ? reviewFilter.includes(Math.round(book.rating || 0))
        : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-gray-200 min-h-screen border-b-theme">
      <title>BookCourier | All Available Books</title>

      {/* Top controls */}
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between gap-4">
        {/* Filter Button */}
        <button
          onClick={() => setFilterSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-indigo-600 transition"
        >
          <FaFilter /> Filter
        </button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 whitebg shadow-lg z-50 transform transition-transform duration-300 ${
          filterSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg">Filters</h2>
          <button
            onClick={() => setFilterSidebarOpen(false)}
            className="text-red-500 font-bold text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-64px)]">
          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2">Select Category</h3>
            <form className="flex flex-col gap-2">
              {categories.map((cat, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={categoryFilters.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="h-4 w-4"
                  />
                  {cat}
                </label>
              ))}
            </form>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2">Price Range :</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={`Min (${minPrice})`}
                value={priceFilter.min}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, min: Number(e.target.value) })
                }
                className="border rounded px-2 py-1 w-20"
              />
              <input
                type="number"
                placeholder={`Max (${maxPrice})`}
                value={priceFilter.max === Infinity ? "" : priceFilter.max}
                onChange={(e) =>
                  setPriceFilter({
                    ...priceFilter,
                    max: Number(e.target.value) || Infinity,
                  })
                }
                className="border rounded px-2 py-1 w-20"
              />
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-semibold mb-2">Reviews</h3>
            <form className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={reviewFilter.includes(star)}
                    onChange={() => handleReviewChange(star)}
                    className="h-4 w-4"
                  />
                  {"⭐".repeat(star)}
                </label>
              ))}
            </form>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setCategoryFilters([]);
              setPriceFilter({ min: minPrice, max: maxPrice });
              setReviewFilter([]);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Overlay when sidebar open */}
      {filterSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setFilterSidebarOpen(false)}
        ></div>
      )}

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-center">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <img src="/loader.gif" alt="Loading..." className="w-16 h-16" />
          </div>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => <BookCard key={idx} book={book} />)
        ) : (
          <p className="text-center description col-span-full">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
