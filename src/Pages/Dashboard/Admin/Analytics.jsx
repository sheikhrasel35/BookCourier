// src/pages/admin/Analytics.jsx
import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import {
  FaUsers, FaUserCheck, FaUser, FaBook, FaShoppingCart, FaCheckCircle, FaDollarSign, FaClipboardList
} from "react-icons/fa";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [userDistribution, setUserDistribution] = useState([]);
  const [booksStatusData, setBooksStatusData] = useState([]);
  const [ordersStatusData, setOrdersStatusData] = useState([]);
  // const [transactionsMonthly, setTransactionsMonthly] = useState([]);
  // const [revenueMonthly, setRevenueMonthly] = useState([]);
  // const [requestsTrend, setRequestsTrend] = useState([]);
  // const [userGrowth, setUserGrowth] = useState([]);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#A569BD", "#FF4560"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://book-courier-server-five.vercel.app/admin/stats");
        const data = await res.json();
        setStats(data);

        // Users pie chart
        setUserDistribution([
          { name: "Admins", value: data.users.admins },
          { name: "Librarians", value: data.users.librarians },
          { name: "Regular Users", value: data.users.regular },
        ]);

        // Books bar chart
        setBooksStatusData([
          { name: "Published", value: data.books.published },
          { name: "Unpublished", value: data.books.unpublished },
        ]);

        // Orders pie chart
        setOrdersStatusData([
          { name: "Pending", value: data.orders.pending },
          { name: "Shipped", value: data.orders.shipped },
          { name: "Delivered", value: data.orders.delivered },
        ]);

        // Mock transactions per month
        // setTransactionsMonthly([
        //   { month: "Jan", transactions: 2 },
        //   { month: "Feb", transactions: 4 },
        //   { month: "Mar", transactions: 3 },
        //   { month: "Apr", transactions: 5 },
        //   { month: "May", transactions: 6 },
        // ]);

        // Mock revenue per month
        // setRevenueMonthly([
        //   { month: "Jan", revenue: 1200 },
        //   { month: "Feb", revenue: 2200 },
        //   { month: "Mar", revenue: 1800 },
        //   { month: "Apr", revenue: 3200 },
        //   { month: "May", revenue: 4418 },
        // ]);

        // Mock requests trend
        // setRequestsTrend([
        //   { date: "2026-01-01", count: 2 },
        //   { date: "2026-01-02", count: 3 },
        //   { date: "2026-01-03", count: 1 },
        //   { date: "2026-01-04", count: 5 },
        //   { date: "2026-01-05", count: 4 },
        // ]);

        // Mock user growth
        // setUserGrowth([
        //   { month: "Jan", users: 2 },
        //   { month: "Feb", users: 3 },
        //   { month: "Mar", users: 4 },
        //   { month: "Apr", users: 6 },
        //   { month: "May", users: 8 },
        // ]);

      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="flex justify-center items-center h-screen"><img src="/loader.gif" alt="" /></div>;

  // Array of stats cards with icon background color
  const statsCards = [
    { icon: <FaUsers className="text-white w-6 h-6" />, label: "Total Users", value: stats.users.total, color: "bg-blue-500" },
    { icon: <FaUserCheck className="text-white w-6 h-6" />, label: "Admins", value: stats.users.admins, color: "bg-green-500" },
    { icon: <FaUserCheck className="text-white w-6 h-6" />, label: "Librarians", value: stats.users.librarians, color: "bg-indigo-500" },
    { icon: <FaUser className="text-white w-6 h-6" />, label: "Regular Users", value: stats.users.regular, color: "bg-yellow-500" },
    { icon: <FaBook className="text-white w-6 h-6" />, label: "Total Books", value: stats.books.total, color: "bg-purple-500" },
    { icon: <FaShoppingCart className="text-white w-6 h-6" />, label: "Published Books", value: stats.books.published, color: "bg-indigo-400" },
    { icon: <FaCheckCircle className="text-white w-6 h-6" />, label: "Unpublished Books", value: stats.books.unpublished, color: "bg-red-500" },
    { icon: <FaClipboardList className="text-white w-6 h-6" />, label: "Total Orders", value: stats.orders.total, color: "bg-pink-500" },
  ];
  
const Card = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 graybg rounded-xl shadow-lg p-4">
    <div className={`${color} w-12 h-12 flex items-center justify-center rounded-full`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-secondary">{label}</span>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="graybg rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

  return (
    <div className="max-w-7xl whitebg mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Admin Analytics Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg">
        {statsCards.map((card, idx) => (
          <Card key={idx} icon={card.icon} label={card.label} value={card.value} color={card.color} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard title="Users Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={userDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {userDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Books Status">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={booksStatusData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ordersStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {ordersStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Total Transactions (Monthly)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionsMonthly}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="transactions" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Total Revenue (Monthly)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueMonthly}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Requests Trend (Last Month)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={requestsTrend}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User Growth (Monthly)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div> */}
    </div>
  );
};

export default Analytics;
