"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useState, useEffect } from "react"
import * as Location from "expo-location"
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

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      Alert.alert("Missing Information", "Please enter both pickup and destination locations.")
      return
    }
    // Navigate to routes page with search parameters
    Alert.alert("Search", `Searching routes from ${fromLocation} to ${toLocation}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Logo - Softer gradient */}
        <LinearGradient
          colors={["#FED7AA", "#FDBA74", "#FB923C", "#F97316"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <PeepLogo />
          <Text style={styles.welcomeText}>Welcome to PEEP PEEP</Text>
          <Text style={styles.subtitleText}>Your Davao City Jeepney Guide</Text>
        </LinearGradient>

        {/* Interactive Map Section */}
        <View style={styles.mapSection}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="location" size={48} color="#E85A4F" />
            <Text style={styles.mapText}>Interactive Map</Text>
            <Text style={styles.mapSubtext}>
              {locationPermission ? "GPS Enabled - Davao City" : "Enable GPS for better experience"}
            </Text>
            {currentLocation && (
              <Text style={styles.coordinatesText}>
                {currentLocation.coords.latitude.toFixed(4)}, {currentLocation.coords.longitude.toFixed(4)}
              </Text>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="map-outline" size={32} color="#E85A4F" />
              <Text style={styles.quickActionText}>View All Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="star-outline" size={32} color="#E85A4F" />
              <Text style={styles.quickActionText}>Saved Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="cash-outline" size={32} color="#E85A4F" />
              <Text style={styles.quickActionText}>Fare Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="chatbubble-outline" size={32} color="#E85A4F" />
              <Text style={styles.quickActionText}>Ask AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Journey Planner */}
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
                />
                {locationPermission && (
                  <TouchableOpacity onPress={requestLocationPermission}>
                    <Ionicons name="locate" size={20} color="#E85A4F" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="navigate-outline" size={20} color="#D946EF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Where to?"
                  placeholderTextColor="#9CA3AF"
                  value={toLocation}
                  onChangeText={setToLocation}
                />
              </View>

              <TouchableOpacity
                onPress={handleSearch}
                disabled={!fromLocation || !toLocation}
                style={[styles.searchButton, (!fromLocation || !toLocation) && styles.searchButtonDisabled]}
              >
                <LinearGradient
                  colors={["#FED7AA", "#FB923C", "#E85A4F"]}
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

        {/* Popular Routes */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
            <TouchableOpacity style={styles.popularCard}>
              <Text style={styles.popularRoute}>Matina - SM City</Text>
              <Text style={styles.popularFare}>₱15</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularCard}>
              <Text style={styles.popularRoute}>Bankerohan - Buhangin</Text>
              <Text style={styles.popularFare}>₱18</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularCard}>
              <Text style={styles.popularRoute}>Toril - Downtown</Text>
              <Text style={styles.popularFare}>₱20</Text>
            </TouchableOpacity>
          </ScrollView>
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
    paddingVertical: 20,
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
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  mapText: {
    fontSize: 16,
    color: "#374151",
    marginTop: 8,
    fontWeight: "600",
  },
  mapSubtext: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  coordinatesText: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
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
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 16,
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
  popularSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  popularScroll: {
    flexDirection: "row",
  },
  popularCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  popularRoute: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  popularFare: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E85A4F",
  },
  bottomSpacing: {
    height: 100,
  },
})
