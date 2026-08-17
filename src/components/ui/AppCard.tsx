import { spacing } from "@/constants/spacing";
import { Colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

interface AppCardProps {
  children: React.ReactNode;
  style?: object;
}

export default function AppCard({ children, style }: AppCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: spacing.md,
    padding: spacing.lg,
  },
});
