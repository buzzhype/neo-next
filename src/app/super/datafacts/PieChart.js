import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceLine
} from 'recharts';

const CustomLineChart = ({ data }) => {
  // Handle different data formats
  const chartData = data.data || data.dataSets?.[0]?.data || [];
  const multipleDataSets = data.dataSets && data.dataSets.length > 1;
  
  // Generate colors for multiple datasets
  const colors = ['#2563eb', '#e11d48', '#059669', '#8b5cf6', '#ea580c', '#0891b2'];
  
  // Check if we need dual Y-axes
  const hasDualYAxis = data.yAxis && typeof data.yAxis === 'object' && data.yAxis.left && data.yAxis.right;
  
  // Find min and max values for better chart scaling
  const findMinMax = (dataSet) => {
    let min = Infinity;
    let max = -Infinity;
    
    const valueKey = Object.keys(dataSet[0] || {})[1]; // Assume second property is the value
    
    dataSet.forEach(item => {
      const value = item[valueKey];
      if (value < min) min = value;
      if (value > max) max = value;
    });
    
    // Add 10% padding to the range
    const padding = (max - min) * 0.1;
    return { 
      min: Math.max(0, min - padding), // Don't go below 0 for most charts
      max: max + padding 
    };
  };
  
  // Format values based on likely content
  const formatValue = (value, name) => {
    // Check if value is numeric
    if (typeof value !== 'number') return value;
    
    const lowerName = name.toLowerCase();
    
    // Format as currency if name suggests monetary value
    if (lowerName.includes('price') || 
        lowerName.includes('cost') || 
        lowerName.includes('value') ||
        lowerName.includes('revenue') ||
        lowerName.includes('income') ||
        lowerName.includes('payment')) {
      return `$${value.toLocaleString()}`;
    }
    
    // Format as percentage if name suggests a rate
    if (lowerName.includes('rate') || 
        lowerName.includes('percentage') ||
        lowerName.includes('growth') ||
        lowerName.includes('change') ||
        lowerName.includes('yield')) {
      return `${value}%`;
    }
    
    // Default formatting for other numeric values
    return value.toLocaleString();
  };
  
  // Custom tooltip that handles different data formats
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatValue(entry.value, entry.name)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Calculate Y-axis domain
  const { min: yMin, max: yMax } = findMinMax(chartData);
  
  return (
    <div className="w-full">
      <h3 className="font-medium text-gray-900 mb-2 text-center">{data.title}</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: hasDualYAxis ? 30 : 20, 
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey={Object.keys(chartData[0] || {})[0]} 
              tick={{ fontSize: 12 }}
              tickMargin={8}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            >
              {data.xAxis && (
                <Label 
                  value={data.xAxis} 
                  position="bottom" 
                  offset={10} 
                  style={{ fontSize: 12, fill: '#6b7280' }} 
                />
              )}
            </XAxis>
            
            {/* Primary Y-axis */}
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[yMin, yMax]}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => {
                // Format large numbers for better readability
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value;
              }}
            >
              {data.yAxis && !hasDualYAxis && (
                <Label 
                  value={data.yAxis} 
                  angle={-90} 
                  position="left" 
                  offset={-15} 
                  style={{ fontSize: 12, fill: '#6b7280' }} 
                />
              )}
              {hasDualYAxis && (
                <Label 
                  value={data.yAxis.left} 
                  angle={-90} 
                  position="left" 
                  offset={-15} 
                  style={{ fontSize: 12, fill: '#6b7280' }} 
                />
              )}
            </YAxis>
            
            {/* Secondary Y-axis if needed */}
            {hasDualYAxis && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              >
                <Label 
                  value={data.yAxis.right} 
                  angle={90} 
                  position="right" 
                  offset={10} 
                  style={{ fontSize: 12, fill: '#6b7280' }} 
                />
              </YAxis>
            )}
            
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ fontSize: '12px' }} 
            />
            
            {/* Reference lines if provided */}
            {data.referenceLines && data.referenceLines.map((line, index) => (
              <ReferenceLine
                key={index}
                y={line.value}
                stroke={line.color || "#ff7300"}
                strokeDasharray="3 3"
                label={{ 
                  value: line.label, 
                  position: 'right', 
                  fill: line.color || "#ff7300", 
                  fontSize: 12 
                }}
              />
            ))}
            
            {/* For single dataset */}
            {!multipleDataSets && (
              <Line
                type="monotone"
                dataKey={Object.keys(chartData[0] || {})[1]}
                stroke="#2563eb"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={{ stroke: '#2563eb', strokeWidth: 2, r: 4, fill: 'white' }}
              />
            )}
            
            {/* For multiple datasets */}
            {multipleDataSets && data.dataSets.map((dataset, index) => (
              <Line
                key={dataset.name}
                type="monotone"
                data={dataset.data}
                name={dataset.name}
                dataKey={Object.keys(dataset.data[0] || {})[1]}
                stroke={colors[index % colors.length]}
                yAxisId={dataset.yAxisId || "left"}
                strokeWidth={2}
                dot={{ 
                  stroke: colors[index % colors.length], 
                  strokeWidth: 2, 
                  r: 4, 
                  fill: 'white' 
                }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Optional notes or explanation */}
      {data.note && (
        <p className="text-xs text-gray-500 mt-2 italic text-center">
          {data.note}
        </p>
      )}
    </div>
  );
};

export default CustomLineChart;
