// src/pages/admin/Analytics.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [usersStats, setUsersStats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch all payments for admin dashboard
        const resTransactions = await axiosSecure.get("/admin/payments", {
          params: { email: "admin.guy@example.com" },
        });
        setTransactions(resTransactions.data || []);

        // 2️⃣ Fetch stats for all users
        const users = await axiosSecure.get("/users");
        const usersData = await Promise.all(
          users.data.map(async (user) => {
            const resStats = await axiosSecure.get("/user/stats", {
              params: { email: user.email, userId: user._id },
            });
            return { ...user, stats: resStats.data };
          })
        );
        setUsersStats(usersData);

        setLoading(false);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  if (loading) {
    return <p className="text-center mt-10">Loading analytics...</p>;
  }

  // Prepare chart data
  const totalSpentData = usersStats.map((user) => ({
    name: user.name || user.displayName || "Unknown",
    totalSpent: user.stats?.totalSpent || 0,
  }));

  const ordersData = usersStats.map((user) => ({
    name: user.name || user.displayName || "Unknown",
    totalOrders: user.stats?.totalOrders || 0,
    paidOrders: user.stats?.paidOrders || 0,
  }));

  const paymentStatusData = [
    { name: "Paid", value: transactions.filter((t) => t.amount).length },
    { name: "Unpaid", value: transactions.filter((t) => !t.amount).length },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10">
      <h1 className="text-4xl font-bold text-center text-primary">Admin Analytics Dashboard</h1>

      {/* Bar Chart: Total Spent per User */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Total Spent by Users ($)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={totalSpentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpent" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Orders per User */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Orders per User</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" />
            <Line type="monotone" dataKey="paidOrders" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Payment Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {paymentStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
