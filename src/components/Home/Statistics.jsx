import React, { useEffect, useRef, useState } from "react";

const statsData = [
  { label: "Books Delivered", value: 12500 },
  { label: "Active Users", value: 5200 },
  { label: "Libraries Partnered", value: 85 },
  { label: "Requests Processed", value: 25000 },
];

const Statistics = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [stats, setStats] = useState(
    statsData.map((s) => ({ ...s, count: 0 }))
  );

  // 👀 Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // 🔢 Start counting only when visible
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((item) => {
          if (item.count < item.value) {
            const increment = Math.ceil(item.value / 60);
            return {
              ...item,
              count: Math.min(item.count + increment, item.value),
            };
          }
          return item;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="py-8 whitebg"
      id="statistics"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2
          className={`text-3xl text-primary font-bold mb-6 ${
            visible ? "animate-fadeUp" : "opacity-0"
          }`}
        >
          Our Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`graybg p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 ${
                visible ? "animate-fadeUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">
                {s.count.toLocaleString()}+
              </h3>
              <p className="text-secondary font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
