import { Colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  const progress = useSharedValue(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    progress.value = withTiming(percentage / 100, {
      duration: 2000,
    });
  }, [percentage]);

  useAnimatedReaction(
    () => Math.round(progress.value * 100),
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setDisplayPercentage)(current);
      }
    },
  );

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>TODAY'S PROGRESS</Text>
          <Text style={styles.heading}>You're doing great.</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Today</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.percentage}>{displayPercentage}%</Text>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>

        <Text style={styles.subtitle}>
          {completed} of {total} activities completed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 22,
    marginTop: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: "rgba(255,255,255,0.7)",
  },

  heading: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.white,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.white,
  },

  progressSection: {
    marginTop: 28,
  },

  percentage: {
    fontSize: 52,
    fontWeight: "800",
    color: Colors.white,
  },

  progressTrack: {
    height: 7,
    marginTop: 14,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.white,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 13,
    color: "rgba(255,255,255,0.72)",
  },
});
