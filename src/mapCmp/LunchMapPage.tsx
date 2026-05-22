import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";
import { useMapPage } from "./hooks/useMapPage";
import MapHeader from "./components/MapHeader";
import MapBottomToolbar from "./components/MapBottomToolbar";
import LocationBottomSheet from "./components/LocationBottomSheet";
import { LunchSideForm } from "./Lunch/SideForm";
import LunchSearchSideForm from "./Lunch/SearchForm";

mapboxgl.accessToken = import.meta.env.VITE_LUNCH_MAPBOX_TOKEN;

const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const DEFAULT_LAT = 34.702331;
const DEFAULT_LNG = 135.496025;

export default function LunchMapPage({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const {
    mapContainer,
    lat,
    lng,
    showForm,
    setShowForm,
    setLocations,
    selectedLocation,
    setSelectedLocation,
    menuOpen,
    setMenuOpen,
    searchForm,
    setSearchForm,
    displayLocations,
    setDisplayLocations,
    moveToCurrentLocation,
  } = useMapPage({ defaultLat: DEFAULT_LAT, defaultLng: DEFAULT_LNG, mapStyle: MAP_STYLE, userId, filterByUser: false });

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />

      <MapHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
        onMenuClose={() => setMenuOpen(false)}
        onSearchOpen={() => setSearchForm(true)}
        hasSearchFilter={displayLocations.length > 0}
        onClearSearch={() => setDisplayLocations([])}
      />

      <MapBottomToolbar
        onRegister={() => setShowForm(true)}
        navigateIcon="👤"
        navigateLabel="自分"
        onNavigate={() => navigate("/night")}
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
