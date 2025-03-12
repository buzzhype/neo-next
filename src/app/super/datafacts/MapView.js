import React, { useState } from "react";
import {
  Map as MapIcon,
  Home,
  Award,
  Info,
  Building,
  Star,
  DollarSign,
  Clock,
} from "lucide-react";

// This is a simulated map component since we don't have access to actual map libraries
// In a real implementation, this would use a library like Google Maps, Mapbox, or Leaflet
const MapView = ({ data }) => {
  const { title, centerLat, centerLng, zoom, markers, heatmap, layers } = data;
  const [activeMarker, setActiveMarker] = useState(null);

  // Calculate simulated map coordinates
  const mapWidth = 600;
  const mapHeight = 300;
  const latRange = 0.05 / (zoom / 12);
  const lngRange = 0.09 / (zoom / 12);

  const minLat = centerLat - latRange;
  const maxLat = centerLat + latRange;
  const minLng = centerLng - lngRange;
  const maxLng = centerLng + lngRange;

  // Helper to convert lat/lng to pixel position
  const getPixelPosition = (lat, lng) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = mapHeight - ((lat - minLat) / (maxLat - minLat)) * mapHeight;
    return { x, y };
  };

  // Set different colors for markers
  const markerColors = [
    "#2563eb",
    "#e11d48",
    "#059669",
    "#8b5cf6",
    "#ea580c",
    "#0891b2",
  ];

  // Get appropriate icon for marker type
  const getMarkerIcon = (marker) => {
    if (marker.type === "home" || marker.name.toLowerCase().includes("house"))
      return Home;
    if (
      marker.type === "building" ||
      marker.name.toLowerCase().includes("condo") ||
      marker.name.toLowerCase().includes("apartment")
    )
      return Building;
    if (
      marker.type === "luxury" ||
      marker.safetyScore >= 9 ||
      marker.schoolRating >= 9
    )
      return Star;
    if (
      marker.type === "investment" ||
      marker.name.toLowerCase().includes("investment")
    )
      return DollarSign;
    if (marker.name.toLowerCase().includes("historic")) return Clock;
    return MapIcon;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <div className="text-xs text-gray-500">
          Center: {centerLat.toFixed(4)}° N, {centerLng.toFixed(4)}° W
        </div>
      </div>

      <div className="relative w-full h-64 bg-blue-50 overflow-hidden rounded-lg border border-gray-200">
        {/* Simulated map grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array(36)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border border-blue-100"></div>
            ))}
        </div>

        {/* Simulated topography */}
        <div className="absolute inset-0">
          {/* Water features */}
          <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-blue-200 opacity-50 rounded-tl-full"></div>

          {/* Simulated hills or elevation */}
          <div className="absolute left-1/4 top-1/4 w-1/4 h-1/4 bg-green-100 opacity-40 rounded-full"></div>
          <div className="absolute left-2/3 top-1/6 w-1/6 h-1/6 bg-green-100 opacity-30 rounded-full"></div>
        </div>

        {/* Simulated streets */}
        <div className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        <div className="absolute left-2/6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="absolute left-3/6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        <div className="absolute left-4/6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="absolute left-5/6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        <div className="absolute top-1/6 left-0 right-0 h-0.5 bg-gray-300"></div>
        <div className="absolute top-2/6 left-0 right-0 h-0.5 bg-gray-200"></div>
        <div className="absolute top-3/6 left-0 right-0 h-0.5 bg-gray-300"></div>
        <div className="absolute top-4/6 left-0 right-0 h-0.5 bg-gray-200"></div>
        <div className="absolute top-5/6 left-0 right-0 h-0.5 bg-gray-300"></div>

        {/* Heatmap overlay if enabled */}
        {heatmap && (
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-green-300 via-yellow-300 to-red-400"></div>
        )}

        {/* Layers if specified */}
        {layers &&
          layers.map((layer, index) => (
            <div
              key={index}
              className="absolute rounded-lg border-2 border-dashed transition-opacity hover:opacity-80"
              style={{
                backgroundColor: `${layer.color}33`, // Add transparency
                borderColor: layer.color,
                top: "10%",
                left: `${20 + index * 15}%`,
                width: "40%",
                height: "40%",
                opacity: layer.opacity || 0.5,
              }}
            >
              <div
                className="absolute top-0 left-0 bg-white px-1 rounded-br text-xs font-medium"
                style={{ color: layer.color }}
              >
                {layer.name}
              </div>
            </div>
          ))}

        {/* Map markers */}
        {markers &&
          markers.map((marker, index) => {
            const position = getPixelPosition(marker.lat, marker.lng);
            const IconComponent = getMarkerIcon(marker);

            // Skip markers that would be off the map
            if (
              position.x < 0 ||
              position.x > mapWidth ||
              position.y < 0 ||
              position.y > mapHeight
            ) {
              return null;
            }

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${(position.x / mapWidth) * 100}%`,
                  top: `${(position.y / mapHeight) * 100}%`,
                }}
                onClick={() =>
                  setActiveMarker(activeMarker === index ? null : index)
                }
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border-2 transition-all hover:scale-110 ${activeMarker === index ? "scale-110 shadow-md" : ""}`}
                  style={{
                    borderColor: markerColors[index % markerColors.length],
                  }}
                >
                  <IconComponent
                    className="w-4 h-4"
                    style={{ color: markerColors[index % markerColors.length] }}
                  />
                </div>
                <div className="text-xs font-medium px-1.5 py-0.5 mt-1 bg-white rounded shadow-sm whitespace-nowrap">
                  {marker.name}
                </div>

                {/* Details popup when marker is active */}
                {activeMarker === index && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-3 w-48 z-10 text-xs">
                    <h4 className="font-medium text-sm mb-1">{marker.name}</h4>

                    {/* Display average price if available */}
                    {marker.price && (
                      <div className="flex items-center mt-1">
                        <DollarSign className="w-3 h-3 text-green-600 mr-1" />
                        <span>Avg Price: ${marker.price.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Display school rating if available */}
                    {marker.schoolRating && (
                      <div className="flex items-center mt-1">
                        <Award className="w-3 h-3 text-yellow-500 mr-1" />
                        <span>School Rating: {marker.schoolRating}/10</span>
                      </div>
                    )}

                    {/* Display park score if available */}
                    {marker.parkScore && (
                      <div className="flex items-center mt-1">
                        <Award className="w-3 h-3 text-green-500 mr-1" />
                        <span>Park Score: {marker.parkScore}/10</span>
                      </div>
                    )}

                    {/* Display safety score if available */}
                    {marker.safetyScore && (
                      <div className="flex items-center mt-1">
                        <Award className="w-3 h-3 text-blue-500 mr-1" />
                        <span>Safety Score: {marker.safetyScore}/10</span>
                      </div>
                    )}

                    {/* Display transit score if available */}
                    {marker.transitScore && (
                      <div className="flex items-center mt-1">
                        <Award className="w-3 h-3 text-purple-500 mr-1" />
                        <span>Transit Score: {marker.transitScore}/100</span>
                      </div>
                    )}

                    {/* Display any additional description */}
                    {marker.description && (
                      <p className="mt-2 text-gray-600">{marker.description}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        {/* Map attribution and note */}
        <div className="absolute bottom-1 right-1 text-xs text-gray-400 bg-white bg-opacity-70 px-1 rounded">
          Map simulation
        </div>
      </div>

      <div className="mt-1 text-xs text-gray-500 flex items-center justify-center">
        <Info className="w-3 h-3 mr-1" />
        Interactive map with real data would be displayed in production
      </div>
    </div>
  );
};

export default MapView;
