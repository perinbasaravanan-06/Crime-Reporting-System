import React, { useState, useMemo } from "react";
import "./AdminDashboard.css";
import { useAdmin } from "../../../Context/AdminContext";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  Filler, // ✅ ADDED
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

/* ✅ REGISTER ALL REQUIRED CHART PARTS */
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  Filler // ✅ REQUIRED FOR fill: true
);

const AdminDashboard = () => {
  const { userList, policeList, crimeList } = useAdmin();
  const [selectedMonth, setSelectedMonth] = useState("ALL");

  /* ===================== COUNTS ===================== */

  const totalUsers = userList.length;
  const totalPolice = policeList.length;
  const totalCrimes = crimeList.length;

  const solvedCrimes = crimeList.filter(
    (c) => c.status === "SOLVED" || c.status === "CLOSED"
  ).length;

  /* ===================== DOUGHNUT (Crime Types) ===================== */

  const crimeTypeCount = useMemo(() => {
    const map = {};
    crimeList.forEach((c) => {
      map[c.crimeType] = (map[c.crimeType] || 0) + 1;
    });
    return map;
  }, [crimeList]);

  const crimeTypeData = {
    labels: Object.keys(crimeTypeCount),
    datasets: [
      {
        data: Object.values(crimeTypeCount),
        backgroundColor: [
          "#2563eb",
          "#dc2626",
          "#f59e0b",
          "#16a34a",
          "#64748b",
          "#9333ea",
        ],
      },
    ],
  };

  /* ===================== LINE CHART (Monthly Trend) ===================== */

  const monthlyCrimeTrend = useMemo(() => {
    const months = {};

    crimeList.forEach((crime) => {
      const date = new Date(crime.reportedAt);
      const month = date.toLocaleString("default", { month: "long" });

      months[month] = (months[month] || 0) + 1;
    });

    return months;
  }, [crimeList]);

  const lineChartData = {
    labels: Object.keys(monthlyCrimeTrend),
    datasets: [
      {
        label: "Crimes Reported",
        data: Object.values(monthlyCrimeTrend),
        borderColor: "#dc2626",
        backgroundColor: "rgba(220,38,38,0.15)",
        tension: 0.4,
        fill: true, // ✅ NOW WORKS
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>System overview and real-time analytics</p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Users</h4>
          <span>{totalUsers}</span>
        </div>

        <div className="stat-card">
          <h4>Total Police</h4>
          <span>{totalPolice}</span>
        </div>

        <div className="stat-card warning">
          <h4>Crimes Reported</h4>
          <span>{totalCrimes}</span>
        </div>

        <div className="stat-card solved">
          <h4>Crimes Solved</h4>
          <span>{solvedCrimes}</span>
        </div>
      </div>

      {/* CHARTS */}
      <div className="dashboard-grid">
        <div className="chart-card">
          <h3>Crime Trend (Monthly)</h3>
          <div className="chart-container">
            <Line data={lineChartData} options={lineOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Crime Type Breakdown</h3>
          <div className="chart-container doughnut">
            <Doughnut data={crimeTypeData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* CURRENT AFFAIRS */}
      <div className="current-affairs">
        <h3>Notices</h3>
        <ul>
          <li>🔔 Police approvals pending review</li>
          <li>📢 Evidence submissions increasing</li>
          <li>🚨 Emergency helplines active 24×7</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
