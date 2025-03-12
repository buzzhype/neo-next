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
 * LineChart
 *
 * @param {Object} props
 * @param {any} props.chartData - The object from ArtifactRenderer with e.g. { type: 'line', someKey: ... }.
 *   Typically you'd store the actual chart data in props.chartData.data or props.chartData.rows, etc.
 * @param {React.RefObject<HTMLDivElement | null>} [props.messagesEndRef] - If needed for scrolling.
 */
export default function LineChart({ chartData, messagesEndRef }) {
  // Handle the case where chartData is completely undefined
  if (!chartData) {
    return (
      <div className="p-3 text-sm text-gray-500">No chart data provided.</div>
    );
  }

  // Find the data array from multiple possible locations
  const chartDataArray =
    chartData.data || chartData.rows || chartData.items || [];

  // Check if we have a valid data array
  if (!Array.isArray(chartDataArray) || chartDataArray.length === 0) {
    return (
      <div className="p-3 text-sm text-gray-500">No line chart data found.</div>
    );
  }

  // Determine which data key to use for the line
  // Use the second key in the first data object as the default value key
  const firstDataItem = chartDataArray[0] || {};
  const dataKeys = Object.keys(firstDataItem);
  const valueKey = dataKeys.length > 1 ? dataKeys[1] : "value";
  const nameKey = dataKeys.length > 0 ? dataKeys[0] : "name";

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartDataArray}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={valueKey}
            stroke="#8884d8"
            strokeWidth={2}
          />
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* If you need a bottom anchor for auto-scroll */}
      <div ref={messagesEndRef} style={{ display: "none" }} />
    </div>
  );
}
