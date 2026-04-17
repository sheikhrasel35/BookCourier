import React from "react";
import {
  FaBook,
  FaFlask,
  FaHistory,
  FaLaptopCode,
  FaPalette,
  FaUserGraduate,
} from "react-icons/fa";

const Categories = () => {
  const categories = [
    { name: "Fiction", icon: <FaBook /> },
    { name: "Non-Fiction", icon: <FaUserGraduate /> },
    { name: "Science", icon: <FaFlask /> },
    { name: "History", icon: <FaHistory /> },
    { name: "Technology", icon: <FaLaptopCode /> },
    { name: "Art", icon: <FaPalette /> },
    { name: "Biography", icon: <FaUserGraduate /> },
  ];

  return (
    <section className="py-10 graybg" id="categories">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl text-primary font-bold mb-4">
          Book Categories
        </h2>
        <p className="description max-w-2xl mx-auto mb-8">
          Explore books across a wide range of categories curated for every
          reader.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 whitebg rounded-full shadow-md cursor-pointer
                         hover:bg-primary hover:text-white hover:scale-105 transition duration-300"
            >
              <span className="text-primary group-hover:text-white text-lg">
                {cat.icon}
              </span>
              <span className="font-medium text-secondary">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
