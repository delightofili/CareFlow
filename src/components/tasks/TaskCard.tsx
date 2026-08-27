import StatusBadge from "@/components/ui/StatusBadge";
import { Colors } from "@/constants/theme";
import { Task } from "@/types";
import * as Haptics from "expo-haptics";
import { Check } from "lucide-react-native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TaskProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskProps) {
  const completed = task.status === "completed";

  const scale = useSharedValue(1);

  const toggleTask = async () => {
    onToggle();

    if (!completed) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    scale.value = withSpring(1.15, {}, () => {
      scale.value = withSpring(1);
    });
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLongPress = () => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ],
    );
  };
  return (
    <Pressable
      onPress={toggleTask}
      onLongPress={handleLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Animated.View
        style={[
          styles.checkbox,
          completed && styles.checkboxCompleted,
          animatedStyle,
        ]}
      >
        {completed && <Check size={15} color={Colors.white} strokeWidth={3} />}
      </Animated.View>

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
    padding: 3,
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
    width: 25,
    height: 25,
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
