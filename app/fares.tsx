import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

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
        <Ionicons name={icon as any} size={24} color="#E85A4F" />
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Logo */}
        <LinearGradient
          colors={["#1E293B", "#334155", "#475569"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <PeepLogo />
          <Text style={styles.headerTitle}>Jeepney Fares</Text>
          <Text style={styles.headerSubtitle}>Davao City Transportation Rates</Text>
        </LinearGradient>

        {/* Fares Section */}
        <View style={styles.faresSection}>
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

          {/* Route-Specific Fares */}
          <View style={styles.routeFaresSection}>
            <Text style={styles.routeFaresTitle}>Route-Specific Fares</Text>

            <View style={styles.routeFareItem}>
              <Text style={styles.routeName}>Matina Aplaya - Agdao</Text>
              <Text style={styles.routeFare}>₱15</Text>
            </View>

            <View style={styles.routeFareItem}>
              <Text style={styles.routeName}>Toril - Roxas Avenue</Text>
              <Text style={styles.routeFare}>₱18</Text>
            </View>

            <View style={styles.routeFareItem}>
              <Text style={styles.routeName}>Mintal - Roxas Avenue</Text>
              <Text style={styles.routeFare}>₱15</Text>
            </View>

            <View style={styles.routeFareItem}>
              <Text style={styles.routeName}>Ulas - Magsaysay Avenue</Text>
              <Text style={styles.routeFare}>₱15</Text>
            </View>

            <View style={styles.routeFareItem}>
              <Text style={styles.routeName}>Sasa via JP Laurel</Text>
              <Text style={styles.routeFare}>₱12</Text>
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
  faresSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
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
    color: "#E85A4F",
  },
  fareCardDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  routeFaresSection: {
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
  routeFaresTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  routeFareItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  routeName: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  routeFare: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E85A4F",
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
})
