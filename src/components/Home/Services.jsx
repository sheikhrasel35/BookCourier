import React from "react";
import {
  FaTruck,
  FaBookOpen,
  FaUserCog,
  FaWarehouse,
  FaCalendarCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaTruck />,
      title: "Library-to-Home Delivery",
      desc: "Get books delivered safely from libraries to your doorstep.",
    },
    {
      icon: <FaBookOpen />,
      title: "Borrow & Return Books",
      desc: "Easily borrow and return books without visiting the library.",
    },
    {
      icon: <FaUserCog />,
      title: "User Account Management",
      desc: "Manage your profile, orders, and reading history.",
    },
    {
      icon: <FaWarehouse />,
      title: "Library Inventory Tracking",
      desc: "Libraries can track available books in real time.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Scheduled Pickups",
      desc: "Choose a convenient time for book pickup or return.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Nearby Library Access",
      desc: "Find and request books from libraries near your location.",
    },
  ];

  return (
    <section className="py-12 whitebg" id="services">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl text-primary font-bold mb-4">Our Services</h2>
        <p className="description max-w-2xl mx-auto mb-8">
          We provide smart library services to make borrowing books simple,
          fast, and convenient.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="graybg p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="text-primary text-4xl mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl text-secondary font-semibold mb-2">
                {service.title}
              </h3>
              <p className="description text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
