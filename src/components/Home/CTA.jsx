import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CTA = () => {
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      toast.success("You are already logged in 🚀");
    }
  };

  return (
    <section
      className="py-16 whitebg text-primary text-center"
      id="cta"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Borrow Books From Home?
        </h2>

        <p className="text-lg text-secondary max-w-2xl mx-auto mb-6">
          Join BookCourier today and enjoy easy access to your favorite
          library books without ever leaving your home.
        </p>

        {user ? (
          <button
            onClick={handleClick}
            className="btn-primary px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            You’re Already a Member
          </button>
        ) : (
          <Link
            to="/signup"
            className="inline-block btn-primary px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </section>
  );
};

export default CTA;
