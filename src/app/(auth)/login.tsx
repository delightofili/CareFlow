import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password)
      return Alert.alert("Error", "Please fill in all fields");

    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);

    if (error) Alert.alert("Login Failed", error.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>CAREFLOW</Text>
      <Text style={styles.tagline}>Your health,{"\n"}organized.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Signing in..." : "Sign in"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/signup" as any)}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.boldText}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  brand: {
    fontSize: 14,
    fontWeight: "800",
    color: "#E53935",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 38,
    marginBottom: 40,
  },
  form: { gap: 14 },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  linkContainer: { marginTop: 16, alignItems: "center" },
  linkText: { fontSize: 14, color: "#6B7280" },
  boldText: { color: "#111827", fontWeight: "700" },
});
