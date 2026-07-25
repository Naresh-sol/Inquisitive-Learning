import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses, totalAmount, totalStudents }) {
  const [view, setView] = useState("Weekly View")

  // Generate mock trend data culminating in the actual totals
  const generateMockTrendData = (finalTotal) => {
    return [
      Math.floor(finalTotal * 0.4),
      Math.floor(finalTotal * 0.55),
      Math.floor(finalTotal * 0.75),
      Math.floor(finalTotal * 0.85),
      Math.floor(finalTotal * 0.65), // small dip
      finalTotal
    ];
  };

  const revenueData = generateMockTrendData(totalAmount || 15000);
  const enrollmentData = generateMockTrendData(totalStudents || 8000);

  const chartData = {
    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        fill: true,
        backgroundColor: "rgba(0, 86, 210, 0.08)", // Light blue fill
        borderColor: "#0056D2",
        borderWidth: 3,
        tension: 0.4, // Smooth curves
        pointBackgroundColor: "#0056D2",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Enrollments",
        data: enrollmentData,
        fill: false,
        borderColor: "#4d90f0", // Lighter blue
        borderWidth: 2,
        borderDash: [5, 5], // Dashed line
        tension: 0.4,
        pointBackgroundColor: "#4d90f0",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll build a custom legend
      },
      tooltip: {
        backgroundColor: "#000",
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.04)",
          drawBorder: false,
        },
        ticks: {
          font: { size: 11 },
          color: "#9ca3af",
          callback: (value) => {
             if (value >= 1000) return '$' + value / 1000 + 'k';
             return '$' + value;
          }
        },
        border: { display: false }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
          color: "#9ca3af",
        },
        border: { display: false }
      }
    }
  }

  return (
    <div className="w-full h-[450px] rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h3 className="text-xl font-extrabold text-richblack-900 tracking-tight">Growth & Engagement Trends</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0056D2]"></span> Revenue
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4d90f0]"></span> Enrollments
            </div>
          </div>
          <select 
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="bg-gray-100 text-sm font-semibold text-gray-600 px-4 py-2 rounded-lg outline-none cursor-pointer border border-transparent hover:border-gray-200"
          >
            <option value="Weekly View">Weekly View</option>
            <option value="Monthly View">Monthly View</option>
            <option value="Yearly View">Yearly View</option>
          </select>
        </div>
      </div>
      
      <div className="relative w-full h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
