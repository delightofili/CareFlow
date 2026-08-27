import { Colors } from "@/constants/theme";
import { useCareFlow } from "@/context/CareFlowContext";
import { router } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddTaskScreen() {
  const { addTask } = useCareFlow();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;

    addTask({
      title,
      category: category || "General",
      time: time || "12:00 PM",
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={{ flexDirection: "row", gap: 8 }}
      >
        <View>
          <MoveLeft />
        </View>
        <Text>back</Text>
      </Pressable>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Morning Medication"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="e.g. Wellness"
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="e.g. 8:00 AM"
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.background },
  label: { fontSize: 14, fontWeight: "600", color: Colors.text, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    fontSize: 16,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
