import StatusBadge from "@/components/ui/StatusBadge";
import { Colors } from "@/constants/theme";
import { Task } from "@/types";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TaskProps {
  task: Task;
}

export default function TaskCard({ task }: TaskProps) {
  const [completed, setCompleted] = useState(task.status === "completed");

  return (
    <Pressable
      onPress={() => setCompleted((prev) => !prev)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
        {completed && <Check size={15} color={Colors.white} strokeWidth={3} />}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, completed && styles.completedTitle]}>
          {task.title}
        </Text>

        <Text style={styles.meta}>
          {task.category} · {task.time}
        </Text>
      </View>

      <StatusBadge status={completed ? "completed" : "pending"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  pressed: {
    opacity: 0.65,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#D4D4D4",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxCompleted: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },

  content: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },

  completedTitle: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },

  meta: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.textMuted,
  },
});
