import ProgressCard from "@/components/home/ProgressCard";
import AppCard from "@/components/ui/AppCard";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppCard>
        <Text style={styles.greeting}>Good morning 👋</Text>

        <Text style={styles.subtitle}>Here's how you're doing today.</Text>

        <ProgressCard percentage={71} completed={4} total={6} />

        <Text style={styles.sectionTitle}>Upcoming</Text>

        <View style={styles.appointmentCard}>
          <View>
            <Text style={styles.appointmentTitle}>Doctor appointment</Text>

            <Text style={styles.appointmentTime}>Today · 3:30 PM</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </View>
      </AppCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  greeting: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 32,
    marginBottom: 12,
  },

  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#F7F7FA",
  },

  appointmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  appointmentTime: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: "#777777",
  },
});
