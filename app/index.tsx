"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { findOptimalRoute } from "../utils/routeAlgorithm"

const DAVAO_LOCATIONS = [
  { name: "Matina Aplaya", lat: 7.0731, lng: 125.6128 },
  { name: "Agdao", lat: 7.0731, lng: 125.6128 },
  { name: "Toril", lat: 7.0197, lng: 125.4953 },
  { name: "Roxas Avenue", lat: 7.0731, lng: 125.6128 },
  { name: "Mintal", lat: 7.0197, lng: 125.4953 },
  { name: "Ulas", lat: 7.0731, lng: 125.6128 },
  { name: "Magsaysay Avenue", lat: 7.0731, lng: 125.6128 },
  { name: "Sasa", lat: 7.0731, lng: 125.6128 },
  { name: "JP Laurel Avenue", lat: 7.0731, lng: 125.6128 },
  { name: "SM City Davao", lat: 7.0969, lng: 125.6147 },
  { name: "Bankerohan Market", lat: 7.0731, lng: 125.6128 },
  { name: "Buhangin", lat: 7.1247, lng: 125.6481 },
  { name: "Downtown Davao", lat: 7.0731, lng: 125.6128 },
  { name: "Ecoland Terminal", lat: 7.1247, lng: 125.6481 },
  { name: "NCCC Mall", lat: 7.0969, lng: 125.6147 },
]

const DAVAO_CENTER = {
  latitude: 7.0731,
  longitude: 125.6128,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const PeepLogo = () => (
  <View style={styles.logoContainer}>
    <Image source={require("../assets/images/logo.png")} style={styles.logoImage} resizeMode="contain" />
  </View>
)

export default function HomeScreen() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null)
  const [locationPermission, setLocationPermission] = useState<boolean>(false)
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [mapRegion, setMapRegion] = useState(DAVAO_CENTER)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        setLocationPermission(true)
        const location = await Location.getCurrentPositionAsync({})
        setCurrentLocation(location)

        // Update map region to user's location if within Davao area
        const userRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        setMapRegion(userRegion)

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        if (address[0]) {
          setFromLocation(`${address[0].street || ""} ${address[0].district || ""}, Davao City`)
        }
      } else {
        Alert.alert("Location Permission", "Please enable location services to use GPS features.")
      }
    } catch (error) {
      console.error("Error requesting location permission:", error)
    }
  }

  const getFilteredSuggestions = (isFromField: boolean) => {
    const selectedLocation = isFromField ? toLocation : fromLocation
    return DAVAO_LOCATIONS.filter((location) => location.name !== selectedLocation)
  }

  const handleLocationSelect = (locationName: string, isFromField: boolean) => {
    if (isFromField) {
      setFromLocation(locationName)
      setShowFromSuggestions(false)
    } else {
      setToLocation(locationName)
      setShowToSuggestions(false)
    }

    // Center map on selected location
    const selectedLoc = DAVAO_LOCATIONS.find((loc) => loc.name === locationName)
    if (selectedLoc) {
      setMapRegion({
        latitude: selectedLoc.lat,
        longitude: selectedLoc.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
  }

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      Alert.alert("Missing Information", "Please enter both pickup and destination locations.")
      return
    }

    const optimalRoute = findOptimalRoute(fromLocation, toLocation, "time")

    if (optimalRoute) {
      const routeInfo = `
Route Found: ${optimalRoute.path.join(" → ")}
Distance: ${optimalRoute.totalDistance} km
Fare: ₱${optimalRoute.totalFare}
Time: ${optimalRoute.totalTime} minutes
Details: ${optimalRoute.routeDetails.join(", ")}
      `
      Alert.alert("Optimal Route", routeInfo.trim())
    } else {
      Alert.alert("No Route Found", "No direct route available between these locations. Please check nearby terminals.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#1E293B", "#334155", "#475569"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <PeepLogo />
          <Text style={styles.welcomeText}>Welcome to PEEP PEEP</Text>
          <Text style={styles.subtitleText}>Your Davao City Jeepney Guide</Text>
        </LinearGradient>

        <View style={styles.mapSection}>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={mapRegion}
              onRegionChangeComplete={setMapRegion}
              showsUserLocation={locationPermission}
              showsMyLocationButton={true}
              showsCompass={true}
              showsScale={true}
            >
              {/* Current location marker */}
              {currentLocation && (
                <Marker
                  coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                  }}
                  title="Your Location"
                  description="Current GPS position"
                  pinColor="#E85A4F"
                />
              )}

              {/* Davao location markers */}
              {DAVAO_LOCATIONS.map((location, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                  title={location.name}
                  description="Jeepney stop/terminal"
                  pinColor="#FFA500"
                />
              ))}
            </MapView>

            <View style={styles.mapOverlay}>
              <Text style={styles.mapOverlayText}>
                {locationPermission ? "Interactive Map - Davao City" : "Enable GPS for live tracking"}
              </Text>
            </View>
          </View>
        </View>

        {/* Journey Planner - Main Focus */}
        <View style={styles.plannerSection}>
          <View style={styles.plannerCard}>
            <Text style={styles.plannerTitle}>Plan your journey</Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={20} color="#E85A4F" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Where from?"
                  placeholderTextColor="#9CA3AF"
                  value={fromLocation}
                  onChangeText={setFromLocation}
                  onFocus={() => setShowFromSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                />
                {locationPermission && (
                  <TouchableOpacity onPress={requestLocationPermission}>
                    <Ionicons name="locate" size={20} color="#E85A4F" />
                  </TouchableOpacity>
                )}
              </View>

              {showFromSuggestions && (
                <View style={styles.suggestionsContainer}>
                  {getFilteredSuggestions(true).map((location, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(location.name, true)}
                    >
                      <Ionicons name="location-outline" size={16} color="#6B7280" />
                      <Text style={styles.suggestionText}>{location.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.inputWrapper}>
                <Ionicons name="navigate-outline" size={20} color="#D946EF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Where to?"
                  placeholderTextColor="#9CA3AF"
                  value={toLocation}
                  onChangeText={setToLocation}
                  onFocus={() => setShowToSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                />
              </View>

              {showToSuggestions && (
                <View style={styles.suggestionsContainer}>
                  {getFilteredSuggestions(false).map((location, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(location.name, false)}
                    >
                      <Ionicons name="navigate-outline" size={16} color="#6B7280" />
                      <Text style={styles.suggestionText}>{location.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity
                onPress={handleSearch}
                disabled={!fromLocation || !toLocation}
                style={[styles.searchButton, (!fromLocation || !toLocation) && styles.searchButtonDisabled]}
              >
                <LinearGradient
                  colors={["#E85A4F", "#DC2626", "#B91C1C"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.searchButtonGradient}
                >
                  <Text style={styles.searchButtonText}>Find Routes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7ED",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 17,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  logoImage: {
    width: 200,
    height: 90,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
  },
  mapSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  mapOverlayText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
    textAlign: "center",
  },
  plannerSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  plannerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  plannerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  suggestionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    maxHeight: 200,
    marginTop: -8,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  suggestionText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  searchButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  searchButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 100,
  },
})
