import React, { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const testimonials = [
    {
      name: "Alice M.",
      feedback: "BookCourier made borrowing books incredibly easy and fast.",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "John D.",
      feedback: "The home delivery feature is a total game changer for readers.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sarah L.",
      feedback: "I love tracking my borrowed books and due dates in one place.",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Michael R.",
      feedback: "This platform saves so much time. Highly recommended!",
      image: "https://i.pravatar.cc/150?img=22",
    },
    {
      name: "Emma W.",
      feedback: "Simple, clean, and very useful for students like me.",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "David K.",
      feedback: "BookCourier connects libraries and readers perfectly.",
      image: "https://i.pravatar.cc/150?img=15",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 graybg"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2
          className={`text-3xl text-primary font-bold mb-4 ${
            visible ? "animate-fadeUp" : "opacity-0"
          }`}
        >
          What Our Users Say
        </h2>

        <p
          className={`description max-w-2xl mx-auto mb-12 ${
            visible ? "animate-fadeUp delay-150" : "opacity-0"
          }`}
        >
          Trusted by readers, students, and libraries across the community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`whitebg p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 ${
                visible ? "animate-fadeUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex justify-center mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-4 border-primary object-cover"
                />
              </div>

              <p className="description italic mb-3">
                “{t.feedback}”
              </p>

              <h4 className="font-semibold text-primary">
                {t.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
