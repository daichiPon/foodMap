import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import type { Schema } from "../../amplify/data/resource";

type LocationType = Schema["Location"]["type"];

type Props = {
  locations: LocationType[];
  /** マーカー色を決める。未指定は赤 */
  markerColor?: (loc: LocationType) => string;
  onSelect?: (loc: LocationType) => void;
  height?: string;
};

/** ページ埋め込み用の小型マップ。渡された地点にフィットする */
export default function MiniMap({ locations, markerColor, onSelect, height = "300px" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = import.meta.env.VITE_LUNCH_MAPBOX_TOKEN;
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [135.496025, 34.702331],
      zoom: 10,
    });
    mapRef.current = map;
    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();
    let hasPoint = false;

    locations.forEach((loc) => {
      if (loc.latitude == null || loc.longitude == null) return;
      const m = new mapboxgl.Marker({ color: markerColor?.(loc) ?? "red" })
        .setLngLat([loc.longitude, loc.latitude])
        .addTo(map);
      if (onSelect) {
        m.getElement().style.cursor = "pointer";
        m.getElement().addEventListener("click", () => onSelect(loc));
      }
      markersRef.current.push(m);
      bounds.extend([loc.longitude, loc.latitude]);
      hasPoint = true;
    });

    if (hasPoint) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  }, [locations, markerColor, onSelect]);

  return <div ref={containerRef} style={{ width: "100%", height, borderRadius: "14px" }} />;
}
