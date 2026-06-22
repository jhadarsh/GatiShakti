import React, { useEffect, useRef } from "react";

// Leaflet is loaded via CDN in index.html — accessed via window.L
// Add to your index.html:
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
//   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

const CONGESTION_COLOR = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };
const SELECTED_COLOR   = "#D95D03";

/**
 * RouteMap
 * Props:
 *   from       { label, lat, lng }
 *   to         { label, lat, lng }
 *   routes     array of route objects from mockRoutes
 *   selectedId string — id of selected route
 *   osrmPaths  object { [routeId]: [[lat,lng],...] } — filled by parent after OSRM fetch
 */
const RouteMap = ({ from, to, routes, selectedId, osrmPaths }) => {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const layersRef    = useRef({});
  const markersRef   = useRef([]);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.control.attribution({ position: "bottomleft", prefix: "© OpenStreetMap" }).addTo(map);

    mapRef.current = map;

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Draw routes + markers whenever data changes
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current || !from || !to || !routes?.length) return;

    const map = mapRef.current;

    // Clear old layers
    Object.values(layersRef.current).forEach((l) => { try { map.removeLayer(l); } catch {} });
    layersRef.current = {};
    markersRef.current.forEach((m) => { try { map.removeLayer(m); } catch {} });
    markersRef.current = [];

    const allLatLngs = [];

    // Draw each route polyline
    routes.forEach((route) => {
      const isSelected = route.id === selectedId;
      const path = osrmPaths?.[route.id] ?? route.waypoints;
      if (!path?.length) return;

      allLatLngs.push(...path);

      // Shadow line
      const shadow = L.polyline(path, {
        color: "#3C0C04",
        weight: isSelected ? 7 : 4,
        opacity: isSelected ? 0.18 : 0.08,
        smoothFactor: 2,
      }).addTo(map);

      // Main line
      const line = L.polyline(path, {
        color: isSelected ? SELECTED_COLOR : CONGESTION_COLOR[route.congestion],
        weight: isSelected ? 5 : 2.5,
        opacity: isSelected ? 1 : 0.45,
        smoothFactor: 2,
        dashArray: isSelected ? null : "6 5",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      line.bindTooltip(
        `<div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:600">${route.label}<br/><span style="color:#8A6A5E">${route.durationMin} min · ${route.distanceKm} km</span></div>`,
        { sticky: true, className: "jp-tooltip" }
      );

      layersRef.current[route.id] = line;
      layersRef.current[`${route.id}_shadow`] = shadow;
    });

    // Custom icon helper
    const pinIcon = (color, label) =>
      L.divIcon({
        html: `
          <div style="
            background:${color};border:2.5px solid white;
            width:28px;height:28px;border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            box-shadow:0 3px 10px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
          ">
            <div style="transform:rotate(45deg);font-size:10px;font-weight:700;color:white;letter-spacing:-0.3px">${label}</div>
          </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        className: "",
      });

    const startMarker = L.marker([from.lat, from.lng], { icon: pinIcon("#22c55e", "A") }).addTo(map);
    startMarker.bindPopup(`<b style="font-family:Montserrat,sans-serif">${from.label}</b>`);

    const endMarker = L.marker([to.lat, to.lng], { icon: pinIcon(SELECTED_COLOR, "B") }).addTo(map);
    endMarker.bindPopup(`<b style="font-family:Montserrat,sans-serif">${to.label}</b>`);

    markersRef.current = [startMarker, endMarker];

    // Fit bounds
    if (allLatLngs.length) {
      map.fitBounds(L.latLngBounds(allLatLngs), { padding: [36, 36] });
    }
  }, [from, to, routes, selectedId, osrmPaths]);

  // Bring selected route to front on change
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current) return;
    Object.entries(layersRef.current).forEach(([id, layer]) => {
      if (id === selectedId && layer.bringToFront) layer.bringToFront();
    });
  }, [selectedId]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 z-[999] bg-surface/90 backdrop-blur-sm border border-primary/10 rounded-xl px-3 py-2 flex items-center gap-3">
        {[
          { color: "#22c55e", label: "Low" },
          { color: "#f59e0b", label: "Med" },
          { color: "#ef4444", label: "High" },
          { color: SELECTED_COLOR, label: "Selected" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <span className="w-4 h-1.5 rounded-full inline-block" style={{ background: color }} />
            <span className="text-[10px] text-text-muted font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;