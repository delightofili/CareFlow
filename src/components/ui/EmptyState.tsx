import { Colors } from "@/constants/theme";
import { Plus } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Plus size={22} color={Colors.primary} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {actionLabel && onAction && (
        <Pressable onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 30,
  },

  icon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  title: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  description: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    color: Colors.textSecondary,
  },

  button: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: Colors.primary,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.white,
  },
});
