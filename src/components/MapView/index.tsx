import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon paths
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Custom map style URL - using a modern, clean style
const MAP_STYLE =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

interface MapViewProps {
  lat: number;
  lng: number;
  name: string;
}

// Component to handle map updates
function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);

  return null;
}

export default function MapView({ lat, lng, name }: MapViewProps) {
  const position: [number, number] = [lat ?? 0, lng ?? 0];

  // Custom icon for the marker
  const customIcon = new L.Icon({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // We'll add zoom control to the top-right
      >
        {/* Modern, clean map style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={MAP_STYLE}
        />

        {/* Add zoom control to top-right */}
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control-zoom leaflet-bar leaflet-control">
            <a className="leaflet-control-zoom-in" href="#" title="Zoom in">
              +
            </a>
            <a className="leaflet-control-zoom-out" href="#" title="Zoom out">
              −
            </a>
          </div>
        </div>

        {/* Marker with custom icon */}
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">Click to explore the area</p>
            </div>
          </Popup>
        </Marker>

        {/* Component to handle map updates */}
        <MapUpdater lat={lat} lng={lng} />
      </MapContainer>

      {/* Optional: Add a subtle overlay gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}
