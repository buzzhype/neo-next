"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for San Francisco real estate trends
const marketData = [
  {
    month: "Jan",
    medianPrice: 1350000,
    avgDOM: 28,
    inventory: 450,
    salesVolume: 310,
    year: "2023",
  },
  {
    month: "Feb",
    medianPrice: 1380000,
    avgDOM: 25,
    inventory: 420,
    salesVolume: 290,
    year: "2023",
  },
  {
    month: "Mar",
    medianPrice: 1420000,
    avgDOM: 22,
    inventory: 480,
    salesVolume: 350,
    year: "2023",
  },
  {
    month: "Apr",
    medianPrice: 1450000,
    avgDOM: 20,
    inventory: 510,
    salesVolume: 380,
    year: "2023",
  },
  {
    month: "May",
    medianPrice: 1480000,
    avgDOM: 18,
    inventory: 540,
    salesVolume: 410,
    year: "2023",
  },
  {
    month: "Jun",
    medianPrice: 1510000,
    avgDOM: 17,
    inventory: 580,
    salesVolume: 430,
    year: "2023",
  },
  {
    month: "Jul",
    medianPrice: 1490000,
    avgDOM: 19,
    inventory: 600,
    salesVolume: 390,
    year: "2023",
  },
  {
    month: "Aug",
    medianPrice: 1460000,
    avgDOM: 22,
    inventory: 580,
    salesVolume: 370,
    year: "2023",
  },
  {
    month: "Sep",
    medianPrice: 1440000,
    avgDOM: 25,
    inventory: 540,
    salesVolume: 340,
    year: "2023",
  },
  {
    month: "Oct",
    medianPrice: 1430000,
    avgDOM: 28,
    inventory: 510,
    salesVolume: 320,
    year: "2023",
  },
  {
    month: "Nov",
    medianPrice: 1410000,
    avgDOM: 32,
    inventory: 480,
    salesVolume: 290,
    year: "2023",
  },
  {
    month: "Dec",
    medianPrice: 1390000,
    avgDOM: 35,
    inventory: 440,
    salesVolume: 270,
    year: "2023",
  },
  {
    month: "Jan",
    medianPrice: 1370000,
    avgDOM: 38,
    inventory: 410,
    salesVolume: 250,
    year: "2024",
  },
  {
    month: "Feb",
    medianPrice: 1380000,
    avgDOM: 36,
    inventory: 390,
    salesVolume: 260,
    year: "2024",
  },
  {
    month: "Mar",
    medianPrice: 1410000,
    avgDOM: 32,
    inventory: 420,
    salesVolume: 290,
    year: "2024",
  },
];

// Data for neighborhood comparison
const neighborhoodData = [
  {
    name: "Pacific Heights",
    medianPrice: 2550000,
    pricePerSqFt: 1350,
    inventory: 38,
    avgDOM: 22,
  },
  {
    name: "Mission District",
    medianPrice: 1650000,
    pricePerSqFt: 950,
    inventory: 52,
    avgDOM: 18,
  },
  {
    name: "SoMa",
    medianPrice: 1250000,
    pricePerSqFt: 1050,
    inventory: 75,
    avgDOM: 25,
  },
  {
    name: "Noe Valley",
    medianPrice: 2100000,
    pricePerSqFt: 1200,
    inventory: 42,
    avgDOM: 19,
  },
  {
    name: "Richmond District",
    medianPrice: 1750000,
    pricePerSqFt: 980,
    inventory: 48,
    avgDOM: 24,
  },
  {
    name: "Marina",
    medianPrice: 2300000,
    pricePerSqFt: 1280,
    inventory: 35,
    avgDOM: 20,
  },
];

// Format number as currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

// Format number as currency for price per square foot
const formatPricePerSqFt = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SFMarketTrends() {
  const [activeTab, setActiveTab] = useState("trends");
  const [activeMetric, setActiveMetric] = useState("medianPrice");
  const [timeRange, setTimeRange] = useState("12m");

  // Filter data based on time range
  const getFilteredData = () => {
    if (timeRange === "3m") {
      return marketData.slice(-3);
    } else if (timeRange === "6m") {
      return marketData.slice(-6);
    } else {
      return marketData.slice(-12);
    }
  };

  const filteredData = getFilteredData();

  // Format data for charts
  const formatChartData = () => {
    return filteredData.map((item) => ({
      ...item,
      name: `${item.month} ${item.year}`,
    }));
  };

  const chartData = formatChartData();

  // Get label for active metric
  const getMetricLabel = () => {
    switch (activeMetric) {
      case "medianPrice":
        return "Median Home Price";
      case "avgDOM":
        return "Average Days on Market";
      case "inventory":
        return "Available Inventory";
      case "salesVolume":
        return "Monthly Sales Volume";
      default:
        return "";
    }
  };

  // Get formatter for active metric
  const getMetricFormatter = () => {
    switch (activeMetric) {
      case "medianPrice":
        return formatCurrency;
      case "avgDOM":
        return (value) => `${value} days`;
      case "inventory":
        return (value) => `${value} homes`;
      case "salesVolume":
        return (value) => `${value} sales`;
      default:
        return (value) => value;
    }
  };

  // Get color for active metric
  const getMetricColor = () => {
    switch (activeMetric) {
      case "medianPrice":
        return "#3b82f6"; // blue
      case "avgDOM":
        return "#ef4444"; // red
      case "inventory":
        return "#10b981"; // green
      case "salesVolume":
        return "#8b5cf6"; // purple
      default:
        return "#3b82f6";
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab navigation */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "trends"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("trends")}
        >
          Market Trends
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "neighborhoods"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("neighborhoods")}
        >
          Neighborhood Comparison
        </button>
      </div>

      {/* Market Trends Tab */}
      {activeTab === "trends" && (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between mb-5">
            {/* Metric selector */}
            <div className="flex gap-2">
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  activeMetric === "medianPrice"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveMetric("medianPrice")}
              >
                Home Prices
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  activeMetric === "avgDOM"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveMetric("avgDOM")}
              >
                Days on Market
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  activeMetric === "inventory"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveMetric("inventory")}
              >
                Inventory
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  activeMetric === "salesVolume"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveMetric("salesVolume")}
              >
                Sales Volume
              </button>
            </div>

            {/* Time range selector */}
            <div className="flex gap-2">
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  timeRange === "3m"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setTimeRange("3m")}
              >
                3 Months
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  timeRange === "6m"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setTimeRange("6m")}
              >
                6 Months
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  timeRange === "12m"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setTimeRange("12m")}
              >
                12 Months
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis
                  tickFormatter={getMetricFormatter()}
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  formatter={getMetricFormatter()}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  name={getMetricLabel()}
                  stroke={getMetricColor()}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-xs text-blue-700 mb-1">
                Current Median Price
              </div>
              <div className="text-xl font-bold text-blue-700">
                {formatCurrency(chartData[chartData.length - 1].medianPrice)}
              </div>
              <div className="text-xs text-blue-700 mt-1">
                +3.2% year-over-year
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-xs text-red-700 mb-1">Days on Market</div>
              <div className="text-xl font-bold text-red-700">
                {chartData[chartData.length - 1].avgDOM} days
              </div>
              <div className="text-xs text-red-700 mt-1">
                -5 days from last month
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-xs text-green-700 mb-1">
                Active Inventory
              </div>
              <div className="text-xl font-bold text-green-700">
                {chartData[chartData.length - 1].inventory} homes
              </div>
              <div className="text-xs text-green-700 mt-1">
                +7.7% from last month
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-xs text-purple-700 mb-1">Monthly Sales</div>
              <div className="text-xl font-bold text-purple-700">
                {chartData[chartData.length - 1].salesVolume} homes
              </div>
              <div className="text-xs text-purple-700 mt-1">
                +11.5% from last month
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Neighborhood Comparison Tab */}
      {activeTab === "neighborhoods" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={neighborhoodData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" tickFormatter={formatCurrency} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={formatCurrency} />
                <Legend />
                <Bar
                  dataKey="medianPrice"
                  name="Median Home Price"
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Neighborhood table */}
          <div className="mt-6">
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Neighborhood
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Median Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price / Sq Ft
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inventory
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days on Market
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {neighborhoodData.map((nbhd) => (
                    <tr key={nbhd.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {nbhd.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatCurrency(nbhd.medianPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatPricePerSqFt(nbhd.pricePerSqFt)}/sq.ft
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {nbhd.inventory} homes
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {nbhd.avgDOM} days
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
