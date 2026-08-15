import { StyleSheet, Text, View } from "react-native";

interface ProgressCardProps {
  percentage: number;
  completed: number;
  total: number;
}

export default function ProgressCard({
  percentage,
  completed,
  total,
}: ProgressCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Progress</Text>
      <Text style={styles.percentage}>{percentage}%</Text>
      <Text style={styles.subtitle}>
        {completed} of {total} completed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F5FA",
    padding: 24,
    borderRadius: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  percentage: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 24,
  },
  subtitle: {
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
    marginTop: 8,
  },
});
