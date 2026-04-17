import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  // Only 3 preview questions to tease users
  const faqs = [
    "How do I request a book?",
    "Can I schedule returns?",
    "Are there late fees?",
  ];

  return (
    <section className="py-20 graybg" id="faq">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl text-primary font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="description max-w-2xl mx-auto mb-12">
          Have questions? Here are a few to get you started. Visit the full FAQ page for more answers!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {faqs.map((q, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 whitebg rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            >
              <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl">
                <FaQuestionCircle />
              </div>
              <p className="font-semibold text-secondary">{q}</p>
            </div>
          ))}
        </div>

        <Link to="/faq">
          <button className="btn-primary px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-indigo-700 transition">
            See All FAQs
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FAQ;
