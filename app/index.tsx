"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
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

const RouteCard = ({ route }: { route: any }) => (
  <View style={styles.routeCard}>
    <View style={styles.routeHeader}>
      <Text style={styles.routeName}>{route.routeName}</Text>
      <View style={styles.fareContainer}>
        <Text style={styles.fareText}>₱{route.fare}</Text>
      </View>
    </View>

    <View style={styles.routeInfo}>
      <View style={styles.timeInfo}>
        <Ionicons name="time-outline" size={16} color="#6B7280" />
        <Text style={styles.timeText}>{route.totalTime}</Text>
      </View>
    </View>

    <View style={styles.stepsContainer}>
      {route.steps.map((step: string, index: number) => (
        <View key={index} style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  </View>
)

export default function HomeScreen() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [routes, setRoutes] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!fromLocation || !toLocation) {
      Alert.alert("Missing Information", "Please enter both pickup and destination locations.")
      return
    }

    setIsSearching(true)
    setTimeout(() => {
      setRoutes([
        {
          id: 1,
          routeName: "Matina Crossing - Roxas Ave",
          walkToStop: "2 min walk to Matina Crossing Terminal",
          rideTime: "15 mins",
          walkFromStop: "3 min walk to destination",
          fare: 15,
          totalTime: "20 mins",
          steps: [
            "Walk 2 minutes to Matina Crossing Terminal",
            'Board jeepney "Matina Crossing - Roxas Ave"',
            "Ride for 15 minutes (8 stops)",
            "Get off at Roxas Ave near SM City Davao",
            "Walk 3 minutes to your destination",
          ],
        },
        {
          id: 2,
          routeName: "Bankerohan - Buhangin",
          walkToStop: "5 min walk to Bankerohan Terminal",
          rideTime: "25 mins",
          walkFromStop: "2 min walk to destination",
          fare: 18,
          totalTime: "32 mins",
          steps: [
            "Walk 5 minutes to Bankerohan Terminal",
            'Board jeepney "Bankerohan - Buhangin"',
            "Ride for 25 minutes (12 stops)",
            "Get off at Buhangin Public Market",
            "Walk 2 minutes to your destination",
          ],
        },
      ])
      setIsSearching(false)
    }, 1500)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Logo */}
        <LinearGradient
          colors={["#f59e0b", "#ea580c", "#ec4899", "#d946ef"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <PeepLogo />
        </LinearGradient>

        {/* Map Placeholder */}
        <View style={styles.mapSection}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={48} color="#9CA3AF" />
            <Text style={styles.mapText}>Interactive Map</Text>
            <Text style={styles.mapSubtext}>Davao City Routes</Text>
          </View>
        </View>

        {/* Journey Planner */}
        <View style={styles.plannerSection}>
          <View style={styles.plannerCard}>
            <Text style={styles.plannerTitle}>Plan your journey</Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={20} color="#f59e0b" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Where from?"
                  placeholderTextColor="#9CA3AF"
                  value={fromLocation}
                  onChangeText={setFromLocation}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="navigate-outline" size={20} color="#ec4899" style={styles.inputIcon} />
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
                disabled={!fromLocation || !toLocation || isSearching}
                style={[
                  styles.searchButton,
                  (!fromLocation || !toLocation || isSearching) && styles.searchButtonDisabled,
                ]}
              >
                <LinearGradient
                  colors={["#f59e0b", "#ea580c", "#ec4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.searchButtonGradient}
                >
                  <Text style={styles.searchButtonText}>{isSearching ? "Finding Routes..." : "See Routes"}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Routes Results */}
        {routes.length > 0 && (
          <View style={styles.routesSection}>
            <Text style={styles.routesTitle}>Available Routes</Text>
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </View>
        )}

        {/* Bottom spacing for navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={24} color="#374151" />
          <Text style={styles.navText}>Routes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#374151" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cash-outline" size={24} color="#374151" />
          <Text style={styles.navText}>Fares</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoImage: {
    width: 200,
    height: 80,
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
  },
  mapText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  plannerSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  plannerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  routesSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  routesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  fareContainer: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fareText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D97706",
  },
  routeInfo: {
    marginBottom: 16,
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  stepsContainer: {
    gap: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  stepText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingBottom: 24,
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: "#374151",
  },
})
