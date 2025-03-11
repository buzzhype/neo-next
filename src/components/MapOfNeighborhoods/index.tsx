// To resolve the Leaflet type error, either install the types:
//   npm install --save-dev @types/leaflet
// or add a declaration file (e.g., src/types/leaflet.d.ts) with:
//   declare module 'leaflet';

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Building2, Navigation, MapPin } from "lucide-react";
import { Neighborhood } from "@/components/NeighborhoodSuggestions";
import { cn } from "@/lib/utils";

// Fix Leaflet's default icon paths
delete (L.Icon.Default as any).prototype._getIconUrl;

// Custom marker styling
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 28 12 28s12-19 12-28c0-6.617-5.383-12-12-12z" fill="#3B82F6"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  popupAnchor: [0, -40],
});

// Custom selected marker styling
const selectedIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 28 12 28s12-19 12-28c0-6.617-5.383-12-12-12z" fill="#1E40AF"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  popupAnchor: [0, -40],
});

// Component to update map bounds based on coordinates
function MapBoundsUpdater({ coords }: { coords: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (coords.length > 0) {
      const bounds = new L.LatLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);

  return null;
}

interface MapOfNeighborhoodsProps {
  neighborhoods: Neighborhood[];
  selectedNeighborhood?: Neighborhood;
  onNeighborhoodSelect?: (neighborhood: Neighborhood) => void;
}

export default function MapOfNeighborhoods({
  neighborhoods,
  selectedNeighborhood,
  onNeighborhoodSelect,
}: MapOfNeighborhoodsProps) {
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(
    null,
  );
  const [mapReady, setMapReady] = useState(false);

  // Filter neighborhoods with valid coordinates
  const validNeighborhoods = neighborhoods.filter((n) => n.lat && n.lng);

  if (validNeighborhoods.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">No map data available</p>
        </div>
      </div>
    );
  }

  // Create an array of coordinates for bounds
  const coords = validNeighborhoods.map(
    (n) => [n.lat!, n.lng!] as [number, number],
  );

  // Calculate center point
  const center = coords.reduce(
    (acc, [lat, lng]) => [
      acc[0] + lat / coords.length,
      acc[1] + lng / coords.length,
    ],
    [0, 0],
  ) as [number, number];

  return (
    <div className="space-y-4">
      <div
        className="bg-white rounded-xl shadow-sm overflow-hidden relative"
        style={{ height: "500px" }}
      >
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          whenReady={() => setMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <ZoomControl position="topright" />

          {validNeighborhoods.map((n) => {
            const isSelected = selectedNeighborhood?.name === n.name;
            const isHovered = hoveredNeighborhood === n.name;

            return (
              <Marker
                key={n.name}
                position={[n.lat!, n.lng!]}
                icon={isSelected || isHovered ? selectedIcon : customIcon}
                eventHandlers={{
                  click: () => onNeighborhoodSelect?.(n),
                  mouseover: () => setHoveredNeighborhood(n.name),
                  mouseout: () => setHoveredNeighborhood(null),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">{n.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {n.description}
                    </p>
                    <div className="mt-2 text-sm font-medium text-blue-600">
                      {n.average_price}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          <MapBoundsUpdater coords={coords} />
        </MapContainer>

        {/* Map overlay controls */}
        <div className="absolute bottom-4 right-4 z-[400] bg-white rounded-lg shadow-lg p-2">
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`,
                "_blank",
              )
            }
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </button>
        </div>
      </div>

      {/* Neighborhood list under map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {validNeighborhoods.map((n) => (
          <div
            key={n.name}
            className={cn(
              "p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
              "hover:border-blue-300 hover:shadow-md",
              selectedNeighborhood?.name === n.name
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200",
              hoveredNeighborhood === n.name && "border-blue-300",
            )}
            onClick={() => onNeighborhoodSelect?.(n)}
            onMouseEnter={() => setHoveredNeighborhood(n.name)}
            onMouseLeave={() => setHoveredNeighborhood(null)}
          >
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">{n.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {n.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
