import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useMapPage } from "./hooks/useMapPage";
import MapHeader from "./components/MapHeader";
import MapBottomToolbar from "./components/MapBottomToolbar";
import LocationBottomSheet from "./components/LocationBottomSheet";
import { LunchSideForm } from "./Lunch/SideForm";
import LunchSearchSideForm from "./Lunch/SearchForm";

mapboxgl.accessToken = import.meta.env.VITE_NIGHT_MAPBOX_TOKEN;

const MAP_STYLE = "mapbox://styles/daichid/cmewx0zzb00pn01sgapg63f9j";
const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.6917;

export default function NightMapPage({ userId }: { userId: string }) {
  const {
    mapContainer,
    lat,
    lng,
    showForm,
    setShowForm,
    setLocations,
    selectedLocation,
    setSelectedLocation,
    searchForm,
    setSearchForm,
    displayLocations,
    setDisplayLocations,
    moveToCurrentLocation,
  } = useMapPage({ defaultLat: DEFAULT_LAT, defaultLng: DEFAULT_LNG, mapStyle: MAP_STYLE, userId, filterByUser: true });

  return (
    <div style={{ position: "relative", height: "100dvh", width: "100vw", overflow: "hidden" }}>
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />

      <MapHeader
        onSearchOpen={() => setSearchForm(true)}
        hasSearchFilter={displayLocations.length > 0}
        onClearSearch={() => setDisplayLocations([])}
      />

      <MapBottomToolbar
        onRegister={() => setShowForm(true)}
        onCurrentLocation={moveToCurrentLocation}
      />

      {showForm && (
        <LunchSideForm
          lat={lat}
          lng={lng}
          userId={userId}
          onClose={() => setShowForm(false)}
          onRegisterComplete={(newLoc) => setLocations((prev) => [...prev, newLoc])}
        />
      )}

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
