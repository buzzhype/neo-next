import React from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Info,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const FlowChart = ({ data = {} }) => {
  // Support both data formats (steps/connections and nodes/edges)
  let { title, direction = "vertical", steps, connections } = data;

  // Convert steps/connections format to nodes/edges if needed
  let nodes = data.nodes || [];
  let edges = data.edges || [];

  // If we have steps but no nodes, convert the format
  if (steps && steps.length > 0 && nodes.length === 0) {
    nodes = steps.map((step) => ({
      id: step.id || step.day || String(steps.indexOf(step)),
      label: step.text || step.event,
      description: step.description,
      icon: step.icon,
    }));

    // Convert connections to edges
    if (connections && connections.length > 0) {
      edges = connections.map((conn) => {
        // Handle both index-based and id-based connections
        const source = typeof conn[0] === "number" ? String(conn[0]) : conn[0];
        const target = typeof conn[1] === "number" ? String(conn[1]) : conn[1];

        return {
          source,
          target,
          type: direction === "vertical" ? "down" : "arrow",
        };
      });
    } else {
      // Create default linear connections if none provided
      edges = nodes.slice(0, -1).map((_, index) => ({
        source: String(nodes[index].id),
        target: String(nodes[index + 1].id),
        type: direction === "vertical" ? "down" : "arrow",
      }));
    }
  }

  const isVertical = direction === "vertical";

  // Get icon based on node content
  const getNodeIcon = (node) => {
    // Use explicit icon if provided
    if (node.icon) {
      switch (node.icon.toLowerCase()) {
        case "clock":
          return Clock;
        case "check":
          return CheckCircle;
        case "alert":
          return AlertCircle;
        case "info":
          return Info;
        default:
          return Info;
      }
    }

    // Otherwise try to infer from label
    const label = node.label.toLowerCase();
    if (label.includes("inspection") || label.includes("review"))
      return AlertCircle;
    if (
      label.includes("complete") ||
      label.includes("final") ||
      label.includes("approval")
    )
      return CheckCircle;
    if (
      label.includes("time") ||
      label.includes("date") ||
      label.includes("deadline")
    )
      return Clock;

    return Info;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-medium text-gray-900 mb-3 text-center">{title}</h3>
      )}

      <div className="border border-gray-200 rounded-lg bg-white p-4">
        <div
          className={`flex ${isVertical ? "flex-col" : "flex-row"} items-center gap-4 overflow-x-auto`}
        >
          {nodes.map((node, index) => {
            const IconComponent = getNodeIcon(node);

            return (
              <React.Fragment key={node.id || index}>
                {/* Node */}
                <div className="flex-shrink-0 w-full max-w-xs border-2 border-blue-500 rounded-lg p-3 bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <IconComponent className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{node.label}</span>
                  </div>

                  {/* Description if available */}
                  {node.description && (
                    <p className="text-xs text-gray-600 mt-1">
                      {node.description}
                    </p>
                  )}
                </div>

                {/* Connection arrow (only if not the last node) */}
                {index < nodes.length - 1 && (
                  <div className="flex-shrink-0 p-2">
                    {isVertical ? (
                      <ArrowDown className="w-6 h-6 text-blue-500" />
                    ) : (
                      <ArrowRight className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Note that this is a simplified flowchart */}
      <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
        <Info className="w-3 h-3 mr-1" />
        {nodes.length} steps in the process
      </div>
    </div>
  );
};

export default FlowChart;
