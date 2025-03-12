"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Marker {
  name: string;
  lat: number;
  lng: number;
  score?: number;
  description?: string;
}

interface MapComponentProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
  title?: string;
}

export default function MapComponent({
  centerLat = 37.7749,
  centerLng = -122.4194,
  zoom = 13,
  markers = [],
  title = "Map",
}: MapComponentProps) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      // Create map instance
      const map = L.map(mapRef.current).setView([centerLat, centerLng], zoom);

      // Add tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        },
      ).addTo(map);

      // Save map instance
      mapInstanceRef.current = map;
    } else {
      // Update view if map already exists
      mapInstanceRef.current.setView([centerLat, centerLng], zoom);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Create custom icon
    const createIcon = (score = 0) => {
      // Color is based on score (0-10) from red to green
      const hue = score * 12; // 0 = red (0), 10 = green (120)
      const color = score ? `hsl(${hue}, 100%, 45%)` : "#3b82f6"; // Default blue if no score

      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 11px;
          ">
            ${score ? Math.round(score * 10) / 10 : ""}
          </div>
        `,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Add markers with popups
    markers.forEach((marker) => {
      const icon = createIcon(marker.score);

      L.marker([marker.lat, marker.lng], { icon }).addTo(map).bindPopup(`
          <div style="min-width: 150px;">
            <strong>${marker.name}</strong>
            ${marker.score ? `<div>Score: ${marker.score}/10</div>` : ""}
            ${marker.description ? `<div style="margin-top: 5px;">${marker.description}</div>` : ""}
          </div>
        `);
    });

    // Fit bounds to markers if there are any
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Cleanup
    return () => {
      // Don't destroy map on unmount to prevent re-initialization issues
      // Just clean up specific resources if needed
    };
  }, [centerLat, centerLng, zoom, markers]);

  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div
        ref={mapRef}
        className="flex-1 rounded-lg overflow-hidden border"
      ></div>
    </div>
  );
}
