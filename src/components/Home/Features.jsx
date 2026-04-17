import React from "react";
import { FaBook, FaHome, FaSyncAlt, FaUserCircle, FaClock } from "react-icons/fa";

const Features = () => {
  const features = [
    { icon: <FaBook />, title: "Browse Books", desc: "Explore a variety of books from nearby libraries." },
    { icon: <FaHome />, title: "Home Delivery", desc: "Get books delivered directly to your doorstep." },
    { icon: <FaSyncAlt />, title: "Schedule Pickups", desc: "Arrange convenient times to borrow or return books." },
    { icon: <FaUserCircle />, title: "User Profiles", desc: "View profiles for a trusted experience." },
    { icon: <FaClock />, title: "Track Status", desc: "Keep track of requests, due dates, and returns." },
  ];

  return (
    <section className="py-16 whitebg" id="features">
      <div className="container mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold mb-10 text-primary">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="p-6 graybg rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <div className="text-4xl mb-4 text-primary">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">{f.title}</h3>
              <p className="description">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
