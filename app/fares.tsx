import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { Alert, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const PeepLogo = () => (
  <View style={styles.logoContainer}>
    <Image source={require("../assets/images/logo.png")} style={styles.logoImage} resizeMode="contain" />
  </View>
)

const FareCard = ({
  title,
  price,
  description,
  icon,
}: {
  title: string
  price: string
  description: string
  icon: string
}) => (
  <View style={styles.fareCard}>
    <View style={styles.fareCardHeader}>
      <View style={styles.fareIconContainer}>
        <Ionicons name={icon as any} size={24} color="#F59E0B" />
      </View>
      <View style={styles.fareCardContent}>
        <Text style={styles.fareCardTitle}>{title}</Text>
        <Text style={styles.fareCardPrice}>{price}</Text>
      </View>
    </View>
    <Text style={styles.fareCardDescription}>{description}</Text>
  </View>
)

export default function FaresScreen() {
  const handleDownloadMatrix = () => {
    Alert.alert("Download Fare Matrix", "This will download the complete fare matrix document to your device.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Download",
        onPress: () => {
          // In a real app, this would trigger a download
          Alert.alert("Success", "Fare matrix downloaded to your device!")
        },
      },
    ])
  }

  const handleViewMatrix = () => {
    Alert.alert("View Fare Matrix", "This will open the complete fare matrix in your browser.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open",
        onPress: () => {
          // In a real app, this would open a web view or external link
          Linking.openURL("https://example.com/davao-jeepney-fare-matrix")
        },
      },
    ])
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

        {/* Fares Section */}
        <View style={styles.faresSection}>
          <Text style={styles.sectionTitle}>Jeepney Fares</Text>
          <Text style={styles.sectionSubtitle}>Current fare rates in Davao City</Text>

          {/* Base Fare */}
          <FareCard
            title="Base Fare"
            price="₱15.00"
            description="First 4 kilometers for regular passengers"
            icon="cash-outline"
          />

          {/* Additional Distance */}
          <FareCard
            title="Additional Distance"
            price="₱2.50 per km"
            description="For every kilometer beyond the first 4km"
            icon="speedometer-outline"
          />

          {/* Student Discount */}
          <FareCard
            title="Student Discount"
            price="20% OFF"
            description="Valid student ID required. Applies to base fare and additional distance"
            icon="school-outline"
          />

          {/* Senior/PWD Discount */}
          <FareCard
            title="Senior Citizen & PWD"
            price="20% OFF"
            description="Valid ID required. Applies to base fare and additional distance"
            icon="accessibility-outline"
          />

          {/* Fare Matrix Actions */}
          <View style={styles.matrixSection}>
            <Text style={styles.matrixTitle}>Complete Fare Matrix</Text>
            <Text style={styles.matrixDescription}>
              Access the detailed fare matrix with all routes and specific pricing information.
            </Text>

            <View style={styles.matrixButtons}>
              <TouchableOpacity onPress={handleViewMatrix} style={styles.matrixButton}>
                <LinearGradient
                  colors={["#f59e0b", "#ea580c"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.matrixButtonGradient}
                >
                  <Ionicons name="eye-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.matrixButtonText}>View Matrix</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDownloadMatrix} style={styles.matrixButton}>
                <View style={styles.matrixButtonOutline}>
                  <Ionicons name="download-outline" size={20} color="#F59E0B" />
                  <Text style={styles.matrixButtonTextOutline}>Download PDF</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={24} color="#3B82F6" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Fare Information</Text>
                <Text style={styles.infoText}>
                  Fares are regulated by the Land Transportation Franchising and Regulatory Board (LTFRB). Always ask
                  for your receipt and report any overcharging.
                </Text>
              </View>
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
    paddingVertical: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 6,
  },
  logoImage: {
    width: 200,
    height: 90,
  },
  faresSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  fareCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fareCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  fareIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  fareCardContent: {
    flex: 1,
  },
  fareCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  fareCardPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F59E0B",
  },
  fareCardDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  matrixSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  matrixTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  matrixDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  matrixButtons: {
    gap: 12,
  },
  matrixButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  matrixButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  matrixButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  matrixButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "#F59E0B",
    borderRadius: 12,
    gap: 8,
  },
  matrixButtonTextOutline: {
    color: "#F59E0B",
    fontSize: 16,
    fontWeight: "600",
  },
  infoSection: {
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#1E40AF",
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
  navTextActive: {
    color: "#F59E0B",
    fontWeight: "600",
  },
})
