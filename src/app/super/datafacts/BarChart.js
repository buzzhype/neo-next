import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceLine,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const chartData = data.data || [];

  // Generate colors
  const getBarColor = (index) => {
    const colors = [
      "#2563eb",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
    ];
    return colors[index % colors.length];
  };

  // Determine if we need to use different colors for each bar
  const useCustomColors = data.useCustomColors || data.colorByValue;

  // Get value key (second property in data objects)
  const getValueKey = () => {
    if (!chartData || chartData.length === 0) return "";
    return Object.keys(chartData[0])[1];
  };

  // Get category key (first property in data objects)
  const getCategoryKey = () => {
    if (!chartData || chartData.length === 0) return "";
    return Object.keys(chartData[0])[0];
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const valueKey = getValueKey();
      const formattedValue = formatValue(value, valueKey);

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].name}: {formattedValue}
          </p>
          {/* Display any additional data if available */}
          {payload[0].payload.description && (
            <p className="text-xs text-gray-600 mt-1 max-w-xs">
              {payload[0].payload.description}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Format values based on column name
  const formatValue = (value, name) => {
    if (typeof value !== "number") return value;

    const lowerName = name.toLowerCase();

    // Format as currency
    if (
      lowerName.includes("price") ||
      lowerName.includes("cost") ||
      lowerName.includes("value") ||
      lowerName.includes("revenue") ||
      lowerName.includes("income") ||
      lowerName.includes("payment")
    ) {
      return `$${value.toLocaleString()}`;
    }

    // Format as percentage
    if (
      lowerName.includes("rate") ||
      lowerName.includes("percentage") ||
      lowerName.includes("growth") ||
      lowerName.includes("change") ||
      lowerName.includes("yield")
    ) {
      return `${value}%`;
    }

    // Default formatting for other numeric values
    return value.toLocaleString();
  };

  // Get color for a specific value (if using color by value)
  const getColorByValue = (value) => {
    if (!data.colorByValue) return getBarColor(0);

    if (data.colorScale === "gradient") {
      // For percentage or rating values (0-100 or 0-10)
      const normalizedValue = value > 10 ? value / 100 : value / 10;

      if (normalizedValue < 0.33) return "#ef4444"; // Red for low values
      if (normalizedValue < 0.66) return "#f59e0b"; // Orange for medium values
      return "#10b981"; // Green for high values
    }

    // For positive/negative values
    if (data.colorScale === "posneg") {
      return value >= 0 ? "#10b981" : "#ef4444";
    }

    return getBarColor(0);
  };

  // Calculate max value for better chart scaling
  const maxValue =
    Math.max(...chartData.map((item) => item[getValueKey()])) * 1.1;

  return (
    <div className="w-full">
      <h3 className="font-medium text-gray-900 mb-2 text-center">
        {data.title}
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
            barSize={data.barSize || 20}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey={getCategoryKey()}
              tick={{ fontSize: 12 }}
              tickMargin={8}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#d1d5db" }}
            >
              {data.xAxis && (
                <Label
                  value={data.xAxis}
                  position="bottom"
                  offset={10}
                  style={{ fontSize: 12, fill: "#6b7280" }}
                />
              )}
            </XAxis>
            <YAxis
              domain={[0, maxValue]}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#d1d5db" }}
              tickFormatter={(value) => {
                // Format large numbers
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value;
              }}
            >
              {data.yAxis && (
                <Label
                  value={data.yAxis}
                  angle={-90}
                  position="left"
                  offset={-15}
                  style={{ fontSize: 12, fill: "#6b7280" }}
                />
              )}
            </YAxis>
            <Tooltip content={<CustomTooltip />} />

            {data.showLegend !== false && (
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: "12px" }}
              />
            )}

            {/* Reference line (like an average or target) */}
            {data.referenceLine && (
              <ReferenceLine
                y={data.referenceLine.value}
                stroke={data.referenceLine.color || "#ff7300"}
                strokeDasharray="3 3"
                label={{
                  position: "right",
                  value: data.referenceLine.label,
                  fill: data.referenceLine.color || "#ff7300",
                  fontSize: 12,
                }}
              />
            )}

            {/* Render bars with individual colors if needed */}
            {useCustomColors ? (
              <Bar
                dataKey={getValueKey()}
                name={data.valueLabel || getValueKey()}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      data.colorByValue
                        ? getColorByValue(entry[getValueKey()])
                        : getBarColor(index)
                    }
                  />
                ))}
              </Bar>
            ) : (
              <Bar
                dataKey={getValueKey()}
                name={data.valueLabel || getValueKey()}
                fill={getBarColor(0)}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.note && (
        <p className="text-xs text-gray-500 mt-2 italic text-center">
          {data.note}
        </p>
      )}
    </div>
  );
};

export default CustomBarChart;
