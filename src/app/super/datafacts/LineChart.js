"use client";
import React from "react";
import {
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

/**
 * CustomLineChart
 *
 * @param {Object} props
 * @param {Array} props.chartData - The array of data objects for Recharts.
 * @param {React.RefObject<HTMLDivElement | null>} [props.messagesEndRef] - Optional ref for a DOM element; if you're using TypeScript, you'd define this as RefObject<HTMLDivElement | null>.
 *
 * This component uses Recharts' <LineChart> and <ResponsiveContainer> to display a line chart.
 */
export default function CustomLineChart({ chartData, messagesEndRef }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          {/* Optional chart styling */}
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Example line series */}
          <Line
            type="monotone"
            dataKey="value" // or whatever key exists in chartData
            stroke="#8884d8"
            strokeWidth={2}
            isAnimationActive
          />
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* If you need to place a DOM ref for scrolling or something else */}
      <div ref={messagesEndRef} style={{ display: "none" }} />
    </div>
  );
}
