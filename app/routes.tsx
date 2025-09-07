"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { DAVAO_ROUTES_DATA } from "../utils/routeAlgorithm"

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

          {route?.streets && (
            <View style={styles.streetsSection}>
              <Text style={styles.sectionTitle}>Streets & Roads</Text>
              {route.streets.map((street: string, index: number) => (
                <View key={index} style={styles.streetItem}>
                  <Ionicons name="trail-sign" size={16} color="#E85A4F" />
                  <Text style={styles.streetText}>{street}</Text>
                </View>
              ))}
            </View>
          )}

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
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
)

export default function RoutesScreen() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [showRouteDetail, setShowRouteDetail] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoutes, setFilteredRoutes] = useState(DAVAO_ROUTES_DATA)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredRoutes(DAVAO_ROUTES_DATA)
    } else {
      const filtered = DAVAO_ROUTES_DATA.filter(
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

      <LinearGradient
        colors={["#1E293B", "#334155", "#475569"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Jeepney Routes</Text>
        <Text style={styles.headerSubtitle}>5 Main Davao City Routes</Text>
      </LinearGradient>

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
  routeInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 24,
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
  streetsSection: {
    marginBottom: 24,
  },
  streetItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  streetText: {
    fontSize: 14,
    color: "#374151",
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
})
