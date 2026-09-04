import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useCareFlow } from "@/context/CareFlowContext";

export default function RecordHealthScreen() {
  const [heartRate, setHeartRate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { recordHealthMeasurement } = useCareFlow();

  const handleSave = async () => {
    const numericVal = parseInt(heartRate, 10);
    if (isNaN(numericVal) || numericVal <= 0) {
      return Alert.alert("Invalid Input", "Please enter a valid heart rate.");
    }

    setSubmitting(true);
    const { error } = await recordHealthMeasurement(
      "heart_rate",
      numericVal,
      "bpm",
    );
    setSubmitting(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart rate</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={heartRate}
          onChangeText={setHeartRate}
          placeholder="72"
          maxLength={3}
        />
        <Text style={styles.unit}>bpm</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleSave}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? "Saving..." : "Save"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  input: {
    fontSize: 48,
    fontWeight: "800",
    color: "#111827",
    borderBottomWidth: 2,
    borderColor: "#E53935",
    textAlign: "center",
    width: 100,
  },
  unit: { fontSize: 20, fontWeight: "600", color: "#6B7280" },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
});
