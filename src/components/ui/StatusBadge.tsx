import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type Status = "completed" | "pending" | "upcoming";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    completed: {
      label: "Completed",
      background: "#EAF8F1",
      color: Colors.success,
    },

    pending: {
      label: "Pending",
      background: "#FFF5E5",
      color: Colors.warning,
    },

    upcoming: {
      label: "Upcoming",
      background: Colors.primarySoft,
      color: Colors.primary,
    },
  }[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.background }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  text: {
    fontSize: 11,
    fontWeight: "700",
  },
});
