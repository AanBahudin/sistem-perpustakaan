import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Inisialisasi map hanya sekali
      mapRef.current = L.map(mapContainerRef.current).setView(
        [-5.489874683570588, 122.57282296762935],
        16
      );

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors & CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Tambahkan marker
      L.marker([-5.489874683570588, 122.57282296762935])
        .addTo(mapRef.current)
    }
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[40vh] md:h-[60vh] rounded-lg shadow-lg border-2 border-gray-300 mt-10"
    />
  );
};

export default Map;
