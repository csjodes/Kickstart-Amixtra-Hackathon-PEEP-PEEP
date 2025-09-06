"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from "react-native"

const DAVAO_ROUTES = [
  {
    id: 1,
    routeNumber: "Route 1",
    routeName: "Matina Aplaya - Downtown",
    destinations: ["Matina Aplaya", "Matina Crossing", "SM City Davao", "Roxas Ave", "Downtown"],
    fare: 15,
    distance: "12 km",
    estimatedTime: "25-30 mins",
    landmarks: ["SM City Davao", "Matina Town Square", "Davao Doctors Hospital"],
    alternateNames: ["Matina Route", "SM Route"],
  },
  {
    id: 2,
    routeNumber: "Route 2",
    routeName: "Bangkal - Toril",
    destinations: ["Bangkal", "Mintal", "Sirawan", "Toril"],
    fare: 18,
    distance: "15 km",
    estimatedTime: "35-40 mins",
    landmarks: ["Toril Public Market", "Sirawan Bridge", "Mintal Proper"],
    alternateNames: ["Toril Route"],
  },
  {
    id: 3,
    routeNumber: "Route 3",
    routeName: "Buhangin - Bankerohan",
    destinations: ["Buhangin", "Agdao", "Bankerohan Terminal", "Downtown"],
    fare: 15,
    distance: "10 km",
    estimatedTime: "20-25 mins",
    landmarks: ["Bankerohan Public Market", "Agdao Bridge", "Buhangin Public Market"],
    alternateNames: ["Bankerohan Route"],
  },
  {
    id: 4,
    routeNumber: "Route 4",
    routeName: "Calinan - Downtown",
    destinations: ["Calinan", "Baguio District", "Talomo", "Downtown"],
    fare: 20,
    distance: "18 km",
    estimatedTime: "40-45 mins",
    landmarks: ["Calinan Public Market", "Baguio District", "Talomo Bridge"],
    alternateNames: ["Calinan Route"],
  },
  {
    id: 5,
    routeNumber: "Route 5A",
    routeName: "Ecoland - SM City",
    destinations: ["Ecoland", "Davao Coastal Road", "SM City Davao", "Ramon Magsaysay (Uyanguren)", "Downtown"],
    fare: 15,
    distance: "14 km",
    estimatedTime: "30-35 mins",
    landmarks: ["SM City Davao", "Ateneo de Davao", "Ramon Magsaysay Park"],
    alternateNames: ["Ecoland Route", "SM Route"],
    roadAliases: ["Ramon Magsaysay Ave (formerly Uyanguren St)"],
  },
  {
    id: 6,
    routeNumber: "Route 6",
    routeName: "Panacan - Bankerohan",
    destinations: ["Panacan", "Sasa", "Bankerohan Terminal"],
    fare: 15,
    distance: "8 km",
    estimatedTime: "18-22 mins",
    landmarks: ["Sasa Port", "Panacan Bridge"],
    alternateNames: ["Panacan Route", "Sasa Route"],
  },
  {
    id: 7,
    routeNumber: "Route 10B",
    routeName: "Catalunan Grande - Downtown",
    destinations: ["Catalunan Grande", "Catalunan Pequeño", "Shrine Hills", "Downtown"],
    fare: 18,
    distance: "16 km",
    estimatedTime: "35-40 mins",
    landmarks: ["Shrine Hills", "Jack's Ridge"],
    alternateNames: ["Catalunan Route"],
  },
]

const RouteDetailModal = ({
  route,
  visible,
  onClose,
}: {
  route: any
  visible: boolean
  onClose: () => void
}) => (
  <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{route?.routeName}</Text>
        <View style={styles.routeNumber}>
          <Text style={styles.routeNumberText}>{route?.routeNumber}</Text>
        </View>
      </View>

      <ScrollView style={styles.modalContent}>
        {/* Interactive Map */}
        <View style={styles.detailMapContainer}>
          <View style={styles.detailMapPlaceholder}>
            <Ionicons name="map" size={64} color="#E85A4F" />
            <Text style={styles.detailMapText}>Interactive Route Map</Text>
            <Text style={styles.detailMapSubtext}>Detailed route visualization with stops</Text>
          </View>
        </View>

        {/* Route Information */}
        <View style={styles.routeInfoCard}>
          <View style={styles.routeStats}>
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={20} color="#E85A4F" />
              <Text style={styles.statLabel}>Fare</Text>
              <Text style={styles.statValue}>₱{route?.fare}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#E85A4F" />
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{route?.estimatedTime}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="location-outline" size={20} color="#E85A4F" />
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{route?.distance}</Text>
            </View>
          </View>

          <View style={styles.destinationsSection}>
            <Text style={styles.sectionTitle}>Route Destinations</Text>
            {route?.destinations.map((destination: string, index: number) => (
              <View key={index} style={styles.destinationItem}>
                <View style={styles.destinationNumber}>
                  <Text style={styles.destinationNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.destinationText}>{destination}</Text>
              </View>
            ))}
          </View>

          {route?.landmarks && (
            <View style={styles.landmarksSection}>
              <Text style={styles.sectionTitle}>Key Landmarks</Text>
              {route.landmarks.map((landmark: string, index: number) => (
                <View key={index} style={styles.landmarkItem}>
                  <Ionicons name="location" size={16} color="#E85A4F" />
                  <Text style={styles.landmarkText}>{landmark}</Text>
                </View>
              ))}
            </View>
          )}

          {route?.roadAliases && (
            <View style={styles.aliasSection}>
              <Text style={styles.sectionTitle}>Road Name Information</Text>
              {route.roadAliases.map((alias: string, index: number) => (
                <Text key={index} style={styles.aliasText}>
                  {alias}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
)

export default function RoutesScreen() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [showRouteDetail, setShowRouteDetail] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoutes, setFilteredRoutes] = useState(DAVAO_ROUTES)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredRoutes(DAVAO_ROUTES)
    } else {
      const filtered = DAVAO_ROUTES.filter(
        (route) =>
          route.routeName.toLowerCase().includes(query.toLowerCase()) ||
          route.routeNumber.toLowerCase().includes(query.toLowerCase()) ||
          route.destinations.some((dest) => dest.toLowerCase().includes(query.toLowerCase())),
      )
      setFilteredRoutes(filtered)
    }
  }

  const openRouteDetail = (route: any) => {
    setSelectedRoute(route)
    setShowRouteDetail(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient
        colors={["#FED7AA", "#FDBA74", "#FB923C", "#F97316"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Jeepney Routes</Text>
        <Text style={styles.headerSubtitle}>Davao City Public Transportation</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes, destinations..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Routes List */}
      <ScrollView style={styles.routesList} showsVerticalScrollIndicator={false}>
        <View style={styles.routesGrid}>
          {filteredRoutes.map((route) => (
            <TouchableOpacity key={route.id} style={styles.routeCard} onPress={() => openRouteDetail(route)}>
              <View style={styles.routeCardHeader}>
                <View style={styles.routeNumber}>
                  <Text style={styles.routeNumberText}>{route.routeNumber}</Text>
                </View>
                <View style={styles.fareContainer}>
                  <Text style={styles.fareText}>₱{route.fare}</Text>
                </View>
              </View>

              <Text style={styles.routeTitle}>{route.routeName}</Text>

              <View style={styles.routeDetails}>
                <View style={styles.routeDetailItem}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.routeDetailText}>{route.estimatedTime}</Text>
                </View>
                <View style={styles.routeDetailItem}>
                  <Ionicons name="location-outline" size={14} color="#6B7280" />
                  <Text style={styles.routeDetailText}>{route.distance}</Text>
                </View>
              </View>

              <Text style={styles.destinationsPreview}>
                {route.destinations.slice(0, 2).join(" → ")}
                {route.destinations.length > 2 && "..."}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <RouteDetailModal route={selectedRoute} visible={showRouteDetail} onClose={() => setShowRouteDetail(false)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7ED",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  routesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  routesGrid: {
    gap: 12,
  },
  routeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  routeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  routeNumber: {
    backgroundColor: "#E85A4F",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  routeNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  fareContainer: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  fareText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D97706",
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  routeDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  routeDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  routeDetailText: {
    fontSize: 12,
    color: "#6B7280",
  },
  destinationsPreview: {
    fontSize: 14,
    color: "#374151",
    fontStyle: "italic",
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#FEF7ED",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
  },
  modalContent: {
    flex: 1,
  },
  detailMapContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  detailMapPlaceholder: {
    height: 300,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  detailMapText: {
    fontSize: 16,
    color: "#374151",
    marginTop: 12,
    fontWeight: "600",
  },
  detailMapSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  routeInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  routeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  statItem: {
    alignItems: "center",
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  statValue: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
  },
  destinationsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  destinationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  destinationNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E85A4F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  destinationNumberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  destinationText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  landmarksSection: {
    marginBottom: 24,
  },
  landmarkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  landmarkText: {
    fontSize: 14,
    color: "#374151",
  },
  aliasSection: {
    marginBottom: 16,
  },
  aliasText: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 4,
  },
})
