"use client";

import { useEffect, useRef } from "react";

interface Salon {
  name: string;
  coords: [number, number];
}

interface MapProps {
  salons?: Salon[];
  center?: [number, number];
  zoom?: number;
}

export default function Map({
  salons = [
    { name: "Luxe Hair Studio - Central", coords: [47.9185, 106.917] },
    { name: "Luxe Hair Studio - West", coords: [47.92, 106.905] },
    { name: "Luxe Hair Studio - East", coords: [47.915, 106.93] },
  ],
  center = [47.9185, 106.917],
  zoom = 13,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      // dynamically import leaflet on client only
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // import icons dynamically
      const iconRetinaUrl = (
        await import("leaflet/dist/images/marker-icon-2x.png")
      ).default;
      const iconUrl = (await import("leaflet/dist/images/marker-icon.png"))
        .default;
      const shadowUrl = (await import("leaflet/dist/images/marker-shadow.png"))
        .default;

      // fix icon
      const DefaultIcon = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!mapRef.current) return;

      // reset map if exists
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      const map = L.map(mapRef.current).setView(center, zoom);
      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      salons.forEach((salon) => {
        L.marker(salon.coords)
          .addTo(map)
          .bindPopup(`<b>${salon.name}</b><br/>Visit us anytime!`);
      });
    })();
  }, [salons, center, zoom]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />;
}
