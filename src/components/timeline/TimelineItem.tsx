import { Colors } from "@/constants/theme";
import { TimelineEvent } from "@/types";
import { CalendarDays, CheckCircle2, Pill } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface TimelineItemProps {
  item: TimelineEvent;
  isLast?: boolean;
}

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  const Icon =
    item.type === "appointment"
      ? CalendarDays
      : item.type === "medication"
        ? Pill
        : CheckCircle2;

  return (
    <View style={styles.container}>
      <View style={styles.timelineColumn}>
        <View style={styles.dot}>
          <Icon size={13} color={Colors.primary} />
        </View>

        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  timelineColumn: {
    width: 40,
    alignItems: "center",
  },

  dot: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  line: {
    width: 1,
    flex: 1,
    minHeight: 55,
    backgroundColor: Colors.border,
  },

  content: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 28,
  },

  header: {
    gap: 5,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  date: {
    fontSize: 11,
    color: Colors.textMuted,
  },

  description: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
  },
});
