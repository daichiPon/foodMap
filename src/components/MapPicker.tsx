import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

type Props = {
  /** 選択中の座標（null なら defaultCenter を表示） */
  value: { lat: number; lng: number } | null;
  onChange: (lat: number, lng: number) => void;
  defaultCenter?: { lat: number; lng: number };
  height?: string;
};

const FALLBACK_CENTER = { lat: 34.702331, lng: 135.496025 };

/** タップ／ドラッグで位置を選ぶインライン地図 */
export default function MapPicker({
  value,
  onChange,
  defaultCenter = FALLBACK_CENTER,
  height = "260px",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = import.meta.env.VITE_LUNCH_MAPBOX_TOKEN;
    }

    const center = value ?? defaultCenter;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [center.lng, center.lat],
      zoom: 14,
    });
    mapRef.current = map;

    const marker = new mapboxgl.Marker({ color: "#FF8E53", draggable: true })
      .setLngLat([center.lng, center.lat])
      .addTo(map);
    markerRef.current = marker;

    marker.on("dragend", () => {
      const p = marker.getLngLat();
      onChangeRef.current(p.lat, p.lng);
    });

    map.on("click", (e) => {
      marker.setLngLat(e.lngLat);
      onChangeRef.current(e.lngLat.lat, e.lngLat.lng);
    });

    return () => map.remove();
    // 初期化はマウント時のみ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 外部から座標が変わったら（現在地ボタン等）ピンと地図を追従させる */
  useEffect(() => {
    if (!value || !mapRef.current || !markerRef.current) return;
    const p = markerRef.current.getLngLat();
    if (Math.abs(p.lat - value.lat) < 1e-9 && Math.abs(p.lng - value.lng) < 1e-9) return;
    markerRef.current.setLngLat([value.lng, value.lat]);
    mapRef.current.flyTo({ center: [value.lng, value.lat], zoom: 14 });
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="anim-pop-in"
      style={{
        width: "100%",
        height,
        borderRadius: "var(--radius)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
      }}
    />
  );
}
