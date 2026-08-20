import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  action?: string;
}

export default function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {action && <Text style={styles.action}>{action}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  action: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },
});
