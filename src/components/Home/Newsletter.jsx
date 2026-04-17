import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="py-16 bg-indigo-50" id="newsletter">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubmit} className="flex justify-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 rounded-l shadow focus:outline-none w-80"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white p-3 rounded-r hover:bg-indigo-700">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
