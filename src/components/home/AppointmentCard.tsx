import { Colors } from "@/constants/theme";
import { Appointment } from "@/types";
import { ChevronRight, Clock3, Stethoscope } from "lucide-react-native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const handlePress = () => {
    Alert.alert(
      "Appointment Details",
      `Appointment with ${appointment.doctor}`,
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconContainer}>
        <Stethoscope size={22} color={Colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{appointment.title}</Text>

        <Text style={styles.doctor}>{appointment.doctor}</Text>

        <View style={styles.timeRow}>
          <Clock3 size={13} color={Colors.textMuted} />
          <Text style={styles.time}>{appointment.time}</Text>
        </View>
      </View>

      <ChevronRight size={20} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  pressed: {
    opacity: 0.7,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  doctor: {
    marginTop: 3,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 5,
  },

  time: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
