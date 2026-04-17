import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
// safe-area handled by SearchOverlay itself
import { landmarks, Landmark } from "../data/landmarks";
import { useAppState } from "../context/AppStateContext";
import { SearchOverlay } from "../components/SearchOverlay";
import { SpotBottomSheet } from "../components/SpotBottomSheet";
import { colors } from "../theme/colors";

const BEIJING_CENTER: Region = {
  latitude: 39.916,
  longitude: 116.397,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12
};

/** 将 Region 的 delta 粗略映射为类似 Google Maps 的 zoom level */
function regionToZoom(region: Region): number {
  return Math.round(Math.log2(360 / region.longitudeDelta));
}

function getMarkerColor(category: string): string {
  switch (category) {
    case "宫殿":
      return "#8B2500";
    case "坛庙":
      return "#9C7A30";
    case "园林":
      return "#2D6A4F";
    case "城门":
      return "#5B3A6B";
    case "寺庙":
      return "#B8602A";
    case "历史街区":
      return "#2C5F7C";
    case "古迹":
      return "#6B6B6B";
    default:
      return "#8B2500";
  }
}

export function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { addRecent } = useAppState();
  const navigation = useNavigation<any>();

  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(
    null
  );
  const [currentZoom, setCurrentZoom] = useState(
    regionToZoom(BEIJING_CENTER)
  );

  const visibleLandmarks = landmarks.filter(
    (l) => currentZoom >= l.zoomThreshold
  );

  const handleRegionChange = useCallback((region: Region) => {
    setCurrentZoom(regionToZoom(region));
  }, []);

  const flyTo = useCallback(
    (landmark: Landmark) => {
      setSelectedLandmark(landmark);
      addRecent(landmark.id);
      mapRef.current?.animateToRegion(
        {
          latitude: landmark.latitude,
          longitude: landmark.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        },
        600
      );
    },
    [addRecent]
  );

  const handleSearchSelect = useCallback(
    (landmark: Landmark) => {
      flyTo(landmark);
    },
    [flyTo]
  );

  const handleMarkerPress = useCallback(
    (landmark: Landmark) => {
      flyTo(landmark);
    },
    [flyTo]
  );

  return (
    <View style={styles.page}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={BEIJING_CENTER}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {visibleLandmarks.map((l) => (
          <Marker
            key={l.id}
            coordinate={{ latitude: l.latitude, longitude: l.longitude }}
            title={l.name}
            description={l.category}
            pinColor={getMarkerColor(l.category)}
            onPress={() => handleMarkerPress(l)}
          />
        ))}
      </MapView>

      {/* 搜索 */}
      <SearchOverlay onSelect={handleSearchSelect} />

      {/* 底部详情卡片 */}
      <SpotBottomSheet
        landmark={selectedLandmark}
        onClose={() => setSelectedLandmark(null)}
        onViewDetail={(id) => navigation.navigate('LandmarkDetail', { landmarkId: id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background
  }
});