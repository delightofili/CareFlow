import { Colors } from "@/constants/theme";
import { StyleSheet, View, ViewStyle } from "react-native";

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function AppCard({ children, style }: AppCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
