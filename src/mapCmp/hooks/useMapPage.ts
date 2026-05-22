import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "identityPool" });

type Options = {
  defaultLat: number;
  defaultLng: number;
  mapStyle: string;
  userId: string;
  filterByUser: boolean;
};

export function useMapPage({ defaultLat, defaultLng, mapStyle, userId, filterByUser }: Options) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const currentMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const savedMarkersRef = useRef<mapboxgl.Marker[]>([]);

  // useEffect の deps に含めずに初期値だけ参照するための ref
  const initRef = useRef({ defaultLat, defaultLng, mapStyle });

  const [lat, setLat] = useState(defaultLat);
  const [lng, setLng] = useState(defaultLng);
  const [showForm, setShowForm] = useState(false);
  const [locations, setLocations] = useState<Schema["Location"]["type"][]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Schema["Location"]["type"] | null>(null);
  const [searchForm, setSearchForm] = useState(false);
  const [displayLocations, setDisplayLocations] = useState<Schema["Location"]["type"][]>([]);

  /** 登録済み地点を取得 */
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const filter = filterByUser ? { cognitoSub: { eq: userId } } : undefined;
        const res = await client.models.Location.list({ filter });
        setLocations(res.data || []);
      } catch (err) {
        console.error("地点取得エラー:", err);
      }
    };
    fetchLocations();
  }, [filterByUser, userId]);

  /** 現在地を取得 */
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("現在地取得がサポートされていません");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => {
        setLat(initRef.current.defaultLat);
        setLng(initRef.current.defaultLng);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  /** マップ初期化（マウント時のみ） */
  useEffect(() => {
    if (!mapContainer.current) return;

    const { defaultLat: initLat, defaultLng: initLng, mapStyle: style } = initRef.current;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [initLng, initLat],
      zoom: 12,
    });
    mapRef.current = map;

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([initLng, initLat])
      .addTo(map);
    currentMarkerRef.current = marker;

    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      setLat(lngLat.lat);
      setLng(lngLat.lng);
    });

    map.on("click", (e) => {
      marker.setLngLat(e.lngLat);
      setLat(e.lngLat.lat);
      setLng(e.lngLat.lng);
    });

    return () => map.remove();
  }, []);

  /** 登録済み地点 or 検索結果を地図に描画 */
  useEffect(() => {
    if (!mapRef.current) return;

    savedMarkersRef.current.forEach((m) => m.remove());
    savedMarkersRef.current = [];

    const targets = displayLocations.length > 0 ? displayLocations : locations;

    targets.forEach((loc) => {
      if (loc.latitude != null && loc.longitude != null) {
        const m = new mapboxgl.Marker({ color: "red" })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(mapRef.current!);

        m.getElement().addEventListener("click", () => {
          setSelectedLocation(loc);
        });

        savedMarkersRef.current.push(m);
      }
    });
  }, [locations, displayLocations]);

  /** 現在地に戻る */
  const moveToCurrentLocation = () => {
    if (!mapRef.current || !currentMarkerRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        mapRef.current!.flyTo({ center: [longitude, latitude], zoom: 14 });
        currentMarkerRef.current!.setLngLat([longitude, latitude]);
      },
      (err) => alert("現在地を取得できません: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  return {
    mapContainer,
    lat,
    lng,
    showForm,
    setShowForm,
    locations,
    setLocations,
    selectedLocation,
    setSelectedLocation,
    searchForm,
    setSearchForm,
    displayLocations,
    setDisplayLocations,
    moveToCurrentLocation,
  };
}
