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

// Replace these imports with your real chart/table components
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
      // Fallback icon
      return LineChartIcon;
  }
}

interface ArtifactRendererProps {
  type?: string;
  data?: any;
}

export default function ArtifactRenderer({
  type,
  data,
}: ArtifactRendererProps) {
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
        return <LineChart data={data} />;
      } else if (data.type === "bar") {
        return <BarChart data={data} />;
      } else if (data.type === "pie") {
        return <PieChartComponent data={data} />;
      } else if (data.type === "multi") {
        // Example of rendering multiple sub-charts
        return (
          <div className="space-y-6">
            {data.charts.map((chart: any, i: number) => (
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
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">Unknown artifact type: {type}</p>
        </div>
      );
  }
}
