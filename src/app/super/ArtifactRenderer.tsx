"use client";
import React from "react";
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Table,
  Map,
  GitFork,
  CheckSquare,
  ArrowLeftRight,
  Calculator as CalculatorIcon,
  Clock,
} from "lucide-react";

// Import components
// Instead of directly importing LineChart, we import it as OriginalLineChart
import OriginalLineChart from "./datafacts/LineChart";
import BarChart from "./datafacts/BarChart";
import PieChartComponent from "./datafacts/PieChart";
import DataTable from "./datafacts/DataTable";
import FlowChart from "./datafacts/FlowChart";
import Checklist from "./datafacts/Checklist";
import PropertyComparison from "./datafacts/PropertyComparison";
import Calculator from "./datafacts/Calculator";
import Timeline from "./datafacts/Timeline";
import MapView from "./datafacts/MapView";

// Define an interface for the LineChart component props
interface LineChartProps {
  chartData: any;
  colors: {
    line: string;
    grid: string;
    tooltip: string;
    tooltipBorder: string;
  };
  messagesEndRef?: React.RefObject<HTMLDivElement>;
}

// Cast the imported LineChart component to accept our extra props
const LineChart = OriginalLineChart as React.FC<LineChartProps>;

// Define brand colors for consistent visualization
const BRAND_COLORS = {
  neutralBlack: "#232226",
  charcoal: "#3c4659",
  manatee: "#8a8ba6",
  horizon: "#5988a6",
  blush: "#d9848b",
};

// Chart color palettes derived from brand colors
const CHART_COLORS = {
  // Main color scheme
  primary: BRAND_COLORS.horizon,
  secondary: BRAND_COLORS.charcoal,
  accent: BRAND_COLORS.blush,
  neutral: BRAND_COLORS.manatee,

  // For sequential data visualizations
  sequential: [
    BRAND_COLORS.horizon,
    "#70a8c0", // horizon lighter
    "#4a7a97", // horizon darker
    BRAND_COLORS.charcoal,
    BRAND_COLORS.manatee,
  ],

  // For categorical data visualizations
  categorical: [
    BRAND_COLORS.horizon,
    BRAND_COLORS.blush,
    BRAND_COLORS.charcoal,
    BRAND_COLORS.manatee,
    "#70a8c0", // horizon lighter
    "#c45f67", // blush darker
  ],

  // For specific chart components
  line: BRAND_COLORS.horizon,
  bar: BRAND_COLORS.charcoal,
  area: `${BRAND_COLORS.horizon}80`, // With transparency
  grid: "#e2e8f0",
  tooltip: "#ffffff",
  tooltipBorder: BRAND_COLORS.horizon,

  // For maps
  mapPrimary: BRAND_COLORS.horizon,
  mapSecondary: BRAND_COLORS.charcoal,
  mapHighlight: BRAND_COLORS.blush,
};

/**
 * Returns a Lucide icon component for the artifact type.
 */
export function getArtifactIcon(type: string) {
  switch (type) {
    case "chart":
      return LineChartIcon;
    case "table":
      return Table;
    case "map":
      return Map;
    case "flowchart":
      return GitFork;
    case "checklist":
      return CheckSquare;
    case "comparison":
      return ArrowLeftRight;
    case "calculator":
      return CalculatorIcon;
    case "timeline":
      return Clock;
    default:
      // fallback icon
      return LineChartIcon;
  }
}

interface ArtifactRendererProps {
  type?: string; // e.g. "chart", "table", "map", etc.
  data?: any; // object that depends on the artifact
}

export default function ArtifactRenderer({
  type,
  data,
}: ArtifactRendererProps) {
  // If no artifact type or data, render nothing
  if (!type || !data) return null;

  switch (type) {
    case "chart":
      /**
       * If `type="chart"`, then `data.type` must be one of:
       * - "line"
       * - "bar"
       * - "pie"
       * - "multi"
       * - "comparison"
       */
      if (data.type === "line") {
        return (
          <LineChart
            chartData={data}
            colors={{
              line: CHART_COLORS.line,
              grid: CHART_COLORS.grid,
              tooltip: CHART_COLORS.tooltip,
              tooltipBorder: CHART_COLORS.tooltipBorder,
            }}
          />
        );
      } else if (data.type === "bar") {
        return (
          <BarChart
            data={data}
            colors={{
              bars: CHART_COLORS.categorical,
              grid: CHART_COLORS.grid,
              tooltip: CHART_COLORS.tooltip,
            }}
          />
        );
      } else if (data.type === "pie") {
        return (
          <PieChartComponent data={data} colors={CHART_COLORS.categorical} />
        );
      } else if (data.type === "multi") {
        // Example: multiple sub-charts
        return (
          <div className="space-y-6">
            {data.charts?.map((chart: any, i: number) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <ArtifactRenderer type="chart" data={chart} />
              </div>
            ))}
          </div>
        );
      } else if (data.type === "comparison") {
        // If you have a "comparison" chart type
        return (
          <PropertyComparison
            data={data}
            colors={{
              primary: CHART_COLORS.primary,
              secondary: CHART_COLORS.secondary,
              accent: CHART_COLORS.accent,
            }}
          />
        );
      }
      return null;

    case "table":
      return (
        <DataTable
          data={data}
          colors={{
            header: BRAND_COLORS.charcoal,
            headerText: "#ffffff",
            alternateRow: "#f8fafc",
            hover: `${BRAND_COLORS.horizon}10`,
            border: "#e2e8f0",
          }}
        />
      );

    case "map":
      return (
        <MapView
          data={data}
          colors={{
            marker: CHART_COLORS.mapPrimary,
            selected: CHART_COLORS.mapHighlight,
            route: CHART_COLORS.mapSecondary,
          }}
        />
      );

    case "flowchart":
      return (
        <FlowChart
          data={data}
          colors={{
            nodes: [
              BRAND_COLORS.horizon,
              BRAND_COLORS.charcoal,
              BRAND_COLORS.manatee,
            ],
            edges: BRAND_COLORS.manatee,
            selected: BRAND_COLORS.blush,
          }}
        />
      );

    case "checklist":
      return (
        <Checklist
          data={data}
          colors={{
            checked: BRAND_COLORS.horizon,
            unchecked: BRAND_COLORS.manatee,
            hover: `${BRAND_COLORS.horizon}20`,
          }}
        />
      );

    case "comparison":
      return (
        <PropertyComparison
          data={data}
          colors={{
            primary: CHART_COLORS.primary,
            secondary: CHART_COLORS.secondary,
            highlight: CHART_COLORS.accent,
            neutral: CHART_COLORS.neutral,
          }}
        />
      );

    case "calculator":
      return (
        <Calculator
          data={data}
          colors={{
            button: BRAND_COLORS.horizon,
            buttonHover: "#4a7a97", // darker horizon
            display: BRAND_COLORS.charcoal,
            operator: BRAND_COLORS.blush,
            equals: BRAND_COLORS.charcoal,
          }}
        />
      );

    case "timeline":
      return (
        <Timeline
          data={data}
          colors={{
            line: BRAND_COLORS.manatee,
            milestone: BRAND_COLORS.horizon,
            currentPoint: BRAND_COLORS.blush,
            text: BRAND_COLORS.charcoal,
          }}
        />
      );

    default:
      // If we get an unknown artifact type
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">Unknown artifact type: {type}</p>
        </div>
      );
  }
}
