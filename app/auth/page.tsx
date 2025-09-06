import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

export default function App() {
  const [page, setPage] = useState("loading") // "loading" | "signup" | "login"
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      {/* Loading Page */}
      {page === "loading" && (
        <View style={styles.inner}>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
          <TouchableOpacity onPress={() => setPage("signup")}>
            <LinearGradient colors={["#ff9914", "#f21b3f"]} style={styles.btnGradient}>
              <Text style={styles.btnText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => setPage("login")}>
            <Text style={styles.btnOutlineText}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sign Up Page */}
      {page === "signup" && (
        <LinearGradient colors={["#ff9914", "#f21b3f"]} style={styles.authPage}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setPage("loading")}>
            <Text style={styles.backBtnText}>{"< Back"}</Text>
          </TouchableOpacity>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
          <View style={styles.authCard}>
            <Text style={styles.title}>Create Your Account</Text>
            <TextInput placeholder="Enter full name" style={styles.input} />
            <TextInput placeholder="Enter email" style={styles.input} keyboardType="email-address" />
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter password"
                style={styles.input}
                secureTextEntry={!showSignupPassword}
              />
              <TouchableOpacity
                style={styles.togglePassword}
                onPress={() => setShowSignupPassword(!showSignupPassword)}
              >
                <Ionicons
                  name={showSignupPassword ? "eye" : "eye-off"}
                  size={22}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <LinearGradient colors={["#ff9914", "#f21b3f"]} style={styles.btnGradient}>
                <Text style={styles.btnText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleBtn}>
              <Image source={require("../../assets/images/google.png")} style={styles.googleIcon} />
              <Text style={styles.googleText}>Sign up with Google</Text>
            </TouchableOpacity>

            <Text style={styles.switchLink}>
              Already have an account?{" "}
              <Text style={styles.switchSpan} onPress={() => setPage("login")}>
                Log In
              </Text>
            </Text>
          </View>
        </LinearGradient>
      )}

      {/* Login Page */}
      {page === "login" && (
        <LinearGradient colors={["#ff9914", "#f21b3f"]} style={styles.authPage}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setPage("loading")}>
            <Text style={styles.backBtnText}>{"< Back"}</Text>
          </TouchableOpacity>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
          <View style={styles.authCard}>
            <Text style={styles.title}>Welcome Back</Text>
            <TextInput placeholder="Enter email" style={styles.input} keyboardType="email-address" />
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter password"
                style={styles.input}
                secureTextEntry={!showLoginPassword}
              />
              <TouchableOpacity
                style={styles.togglePassword}
                onPress={() => setShowLoginPassword(!showLoginPassword)}
              >
                <Ionicons
                  name={showLoginPassword ? "eye" : "eye-off"}
                  size={22}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.forgot}>Forgot password?</Text>
            <TouchableOpacity>
              <LinearGradient colors={["#ff9914", "#f21b3f"]} style={styles.btnGradient}>
                <Text style={styles.btnText}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleBtn}>
              <Image source={require("../../assets/images/google.png")} style={styles.googleIcon} />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>

            <Text style={styles.switchLink}>
              Don’t have an account?{" "}
              <Text style={styles.switchSpan} onPress={() => setPage("signup")}>
                Sign Up
              </Text>
            </Text>
          </View>
        </LinearGradient>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 200, height: 80, resizeMode: "contain", marginBottom: 20 },
  btnGradient: { padding: 14, borderRadius: 30, width: "100%", marginVertical: 8 },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16, textAlign: "center" },
  btnOutline: {
    borderWidth: 2,
    borderColor: "#dc0073",
    padding: 14,
    borderRadius: 30,
    width: "100%",
    marginVertical: 8,
  },
  btnOutlineText: { fontWeight: "bold", fontSize: 16, color: "#dc0073", textAlign: "center" },

  // Auth pages
  authPage: { flex: 1, alignItems: "center" },
  authCard: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 20,
    width: "100%",
    marginTop: "auto",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
  },
  inputWrapper: { position: "relative", width: "100%" },
  togglePassword: { position: "absolute", right: 15, top: 22 },
  forgot: { textAlign: "right", fontSize: 13, color: "#f21b3f", marginBottom: 10 },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#dc0073",
    borderRadius: 30,
    padding: 12,
    marginTop: 10,
  },
  googleIcon: { width: 20, height: 20, marginRight: 10, resizeMode: "contain" },
  googleText: { fontWeight: "bold", fontSize: 16, color: "#dc0073" },
  switchLink: { marginTop: 15, fontSize: 14, textAlign: "center" },
  switchSpan: { color: "#dc0073", fontWeight: "bold" },
  backBtn: { position: "absolute", top: 15, left: 15 },
  backBtnText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
})
