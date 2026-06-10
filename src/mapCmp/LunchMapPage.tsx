import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMapPage } from "./hooks/useMapPage";
import MapHeader from "./components/MapHeader";
import MapFilterTabs, { type MapFilterMode } from "./components/MapFilterTabs";
import MapFloatingControls from "./components/MapFloatingControls";
import LocationBottomSheet from "./components/LocationBottomSheet";
import LunchSearchSideForm from "./Lunch/SearchForm";
import { fetchFollowing } from "../api/follows";

mapboxgl.accessToken = import.meta.env.VITE_LUNCH_MAPBOX_TOKEN;

const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const DEFAULT_LAT = 34.702331;
const DEFAULT_LNG = 135.496025;

export default function LunchMapPage({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState<MapFilterMode>("all");
  const [followeeIds, setFolloweeIds] = useState<Set<string>>(new Set());

  const {
    mapContainer,
    lat,
    lng,
    locations,
    selectedLocation,
    setSelectedLocation,
    searchForm,
    setSearchForm,
    displayLocations,
    setDisplayLocations,
    moveToCurrentLocation,
  } = useMapPage({ defaultLat: DEFAULT_LAT, defaultLng: DEFAULT_LNG, mapStyle: MAP_STYLE, userId, filterByUser: false });

  useEffect(() => {
    fetchFollowing(userId).then((follows) =>
      setFolloweeIds(new Set(follows.map((f) => f.followeeId)))
    );
  }, [userId]);

  /** 全員/自分/フレンドの切り替え */
  const handleFilterChange = (mode: MapFilterMode) => {
    setFilterMode(mode);
    if (mode === "all") {
      setDisplayLocations([]);
    } else if (mode === "mine") {
      setDisplayLocations(locations.filter((loc) => loc.cognitoSub === userId));
    } else {
      setDisplayLocations(
        locations.filter(
          (loc) =>
            loc.cognitoSub === userId || (loc.cognitoSub != null && followeeIds.has(loc.cognitoSub))
        )
      );
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%", overflow: "hidden" }}>
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />

      <MapHeader
        onSearchOpen={() => setSearchForm(true)}
        hasSearchFilter={filterMode === "all" && displayLocations.length > 0}
        onClearSearch={() => setDisplayLocations([])}
      />

      <MapFilterTabs mode={filterMode} onChange={handleFilterChange} />

      <MapFloatingControls
        onCurrentLocation={moveToCurrentLocation}
        onRegisterHere={() => navigate("/register", { state: { lat, lng } })}
      />

      {searchForm && (
        <LunchSearchSideForm
          onClose={() => setSearchForm(false)}
          onSearchResult={(result) => setDisplayLocations(result)}
        />
      )}

      {selectedLocation && (
        <LocationBottomSheet
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
}
