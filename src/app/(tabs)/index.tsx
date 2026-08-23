import AppointmentCard from "@/components/home/AppointmentCard";
import HealthMetric from "@/components/home/HealthMetric";
import ProgressCard from "@/components/home/ProgressCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Colors } from "@/constants/theme";
import { spacing } from "@/constants/spacing";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.greeting}>Good morning 👋</Text>

        <Text style={styles.subtitle}>Here's how you're doing today.</Text>

        <ProgressCard percentage={72} completed={4} total={6} />

        <SectionHeader title="Today's Health" />

        <View style={styles.metrics}>
          <HealthMetric icon="heart" unit="bpm" value="72" label="Heart rate" />

          <HealthMetric
            icon="water"
            unit="glasses"
            value="4 / 8"
            label="Water"
          />
        </View>

        <SectionHeader title="Upcoming" action="View all" />

        <AppointmentCard
          appointment={{
            doctor: "Dr. Williams",
            id: "1",
            title: "Doctor's Appointment",
            type: "Appointment",
            time: "6:00 PM",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: 40,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: Colors.textSecondary,
  },

  metrics: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
