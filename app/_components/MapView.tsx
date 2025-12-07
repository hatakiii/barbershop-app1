"use client";

import { useEffect, useRef } from "react";

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function MapView({ lat, lng, zoom = 13 }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // fix default icon
      const DefaultIcon = L.icon({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!mapRef.current) return;

      // reset map if exists
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      const map = L.map(mapRef.current).setView([lat, lng], zoom);
      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // marker for the center
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>Current Location</b>`)
        .openPopup();
    })();
  }, [lat, lng, zoom]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />;
}
