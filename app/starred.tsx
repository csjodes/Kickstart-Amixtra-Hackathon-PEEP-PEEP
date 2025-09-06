"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native"

const PeepLogo = () => (
  <View style={styles.logoContainer}>
    <Image source={require("../assets/images/logo.png")} style={styles.logoImage} resizeMode="contain" />
  </View>
)

const StarredRouteCard = ({
  route,
  onExpand,
  onToggleStar,
}: {
  route: any
  onExpand: () => void
  onToggleStar: () => void
}) => (
  <TouchableOpacity onPress={onExpand} style={styles.routeCard}>
    <View style={styles.routeHeader}>
      <Text style={styles.routeName}>{route.routeName}</Text>
      <View style={styles.routeHeaderRight}>
        <View style={styles.fareContainer}>
          <Text style={styles.fareText}>₱{route.fare}</Text>
        </View>
        <TouchableOpacity onPress={onToggleStar} style={styles.starButton}>
          <Ionicons name="star" size={20} color="#F59E0B" />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.routeInfo}>
      <View style={styles.timeInfo}>
        <Ionicons name="time-outline" size={16} color="#6B7280" />
        <Text style={styles.timeText}>{route.totalTime}</Text>
      </View>
    </View>

    <View style={styles.stepsContainer}>
      {route.steps.slice(0, 2).map((step: string, index: number) => (
        <View key={index} style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
      {route.steps.length > 2 && <Text style={styles.moreSteps}>+{route.steps.length - 2} more steps</Text>}
    </View>
  </TouchableOpacity>
)

const RouteDetailModal = ({
  route,
  visible,
  onClose,
  onToggleStar,
}: {
  route: any
  visible: boolean
  onClose: () => void
  onToggleStar: () => void
}) => (
  <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{route?.routeName}</Text>
        <TouchableOpacity onPress={onToggleStar} style={styles.starButton}>
          <Ionicons name="star" size={24} color="#F59E0B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.modalContent}>
        <View style={styles.detailMapContainer}>
          <View style={styles.detailMapPlaceholder}>
            <Ionicons name="map" size={64} color="#9CA3AF" />
            <Text style={styles.detailMapText}>Detailed Route Map</Text>
            <Text style={styles.detailMapSubtext}>Interactive route visualization</Text>
          </View>
        </View>

        <View style={styles.routeDetailCard}>
          <View style={styles.routeDetailHeader}>
            <View style={styles.fareContainer}>
              <Text style={styles.fareText}>₱{route?.fare}</Text>
            </View>
            <View style={styles.timeInfo}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text style={styles.timeText}>{route?.totalTime}</Text>
            </View>
          </View>

          <View style={styles.stepsContainer}>
            {route?.steps.map((step: string, index: number) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
)

export default function StarredScreen() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [showRouteDetail, setShowRouteDetail] = useState(false)

  // Mock starred routes data
  const [starredRoutes, setStarredRoutes] = useState([
    {
      id: 1,
      routeName: "Matina Crossing - Roxas Ave",
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
  ])

  const removeFromStarred = (routeId: number) => {
    setStarredRoutes((prev) => prev.filter((route) => route.id !== routeId))
  }

  const openRouteDetail = (route: any) => {
    setSelectedRoute(route)
    setShowRouteDetail(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Logo */}
        <LinearGradient
          colors={["#FED7AA", "#FDBA74", "#FB923C", "#F97316"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <PeepLogo />
          <Text style={styles.headerTitle}>Starred Routes</Text>
          <Text style={styles.headerSubtitle}>Your favorite jeepney routes</Text>
        </LinearGradient>

        {/* Starred Routes Section */}
        <View style={styles.starredSection}>
          {starredRoutes.length > 0 ? (
            starredRoutes.map((route) => (
              <StarredRouteCard
                key={route.id}
                route={route}
                onExpand={() => openRouteDetail(route)}
                onToggleStar={() => removeFromStarred(route.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="star-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Starred Routes</Text>
              <Text style={styles.emptySubtitle}>Star your favorite routes from the Routes tab to see them here</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Route Detail Modal */}
      <RouteDetailModal
        route={selectedRoute}
        visible={showRouteDetail}
        onClose={() => setShowRouteDetail(false)}
        onToggleStar={() => selectedRoute && removeFromStarred(selectedRoute.id)}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 24,
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
  headerTitle: {
    fontSize: 24,
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
  starredSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
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
  routeHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  starButton: {
    padding: 4,
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
  moreSteps: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    marginLeft: 36,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 32,
    lineHeight: 20,
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
  },
  detailMapText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 12,
    fontWeight: "500",
  },
  detailMapSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  routeDetailCard: {
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
  routeDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
})
