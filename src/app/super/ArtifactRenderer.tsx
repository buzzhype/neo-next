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
import LineChart from "./datafacts/LineChart";
import BarChart from "./datafacts/BarChart";
import PieChartComponent from "./datafacts/PieChart";
import DataTable from "./datafacts/DataTable";
import FlowChart from "./datafacts/FlowChart";
import Checklist from "./datafacts/Checklist";
import PropertyComparison from "./datafacts/PropertyComparison";
import Calculator from "./datafacts/Calculator";
import Timeline from "./datafacts/Timeline";
import MapView from "./datafacts/MapView";

// Define brand colors for stylesheets instead of directly passing as props
// (This avoids the TypeScript errors)
const BRAND_COLORS = {
  neutralBlack: "#232226",
  charcoal: "#3c4659",
  manatee: "#8a8ba6",
  horizon: "#5988a6",
  blush: "#d9848b",
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
        // Don't pass colors prop to avoid type error
        return <LineChart chartData={data} />;
      } else if (data.type === "bar") {
        return <BarChart data={data} />;
      } else if (data.type === "pie") {
        return <PieChartComponent data={data} />;
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
        return <PropertyComparison data={data} />;
      }
      return null;

    case "table":
      return <DataTable data={data} />;

    case "map":
      return <MapView data={data} />;

    case "flowchart":
      return <FlowChart data={data} />;

    case "checklist":
      return <Checklist data={data} />;

    case "comparison":
      return <PropertyComparison data={data} />;

    case "calculator":
      return <Calculator data={data} />;

    case "timeline":
      return <Timeline data={data} />;

    default:
      // If we get an unknown artifact type
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">Unknown artifact type: {type}</p>
        </div>
      );
  }
}
