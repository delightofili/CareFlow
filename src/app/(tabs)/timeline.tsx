import TimelineItem from "@/components/timeline/TimelineItem";
import Skeleton from "@/components/ui/Skeleton";
import { Colors } from "@/constants/theme";
import { TimelineEvent } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    title: "Doctor appointment",
    description: "Check-up with Dr. Williams",
    date: "Today · 3:30 PM",
    type: "appointment",
  },
  {
    id: "2",
    title: "Medication",
    description: "Morning medication completed",
    date: "Today · 8:00 AM",
    type: "medication",
  },
  {
    id: "3",
    title: "Daily task",
    description: "20 minute walk completed",
    date: "Yesterday · 5:10 PM",
    type: "task",
  },
];

export default function TimelineScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Health Timeline</Text>

        <Text style={styles.subtitle}>August 15</Text>

        {loading ? (
          <View style={styles.timelineSkeleton}>
            <View
              style={{
                flex: 1,
                gap: 3,
                flexDirection: "row",
              }}
            >
              <Skeleton width="20%" height={50} borderRadius={6} />
              <View style={{ flex: 1, gap: 4, flexDirection: "column" }}>
                <Skeleton width="60%" height={16} borderRadius={6} />
                <Skeleton width="80%" height={16} borderRadius={6} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                gap: 3,
                flexDirection: "row",
              }}
            >
              <Skeleton width="20%" height={50} borderRadius={6} />
              <View style={{ flex: 1, gap: 4, flexDirection: "column" }}>
                <Skeleton width="60%" height={16} borderRadius={6} />
                <Skeleton width="80%" height={16} borderRadius={6} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                gap: 3,
                flexDirection: "row",
              }}
            >
              <Skeleton width="20%" height={50} borderRadius={6} />
              <View style={{ flex: 1, gap: 4, flexDirection: "column" }}>
                <Skeleton width="60%" height={16} borderRadius={6} />
                <Skeleton width="80%" height={16} borderRadius={6} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                gap: 3,
                flexDirection: "row",
              }}
            >
              <Skeleton width="20%" height={50} borderRadius={6} />
              <View style={{ flex: 1, gap: 4, flexDirection: "column" }}>
                <Skeleton width="60%" height={16} borderRadius={6} />
                <Skeleton width="80%" height={16} borderRadius={6} />
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={TIMELINE_EVENTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TimelineItem
                item={item}
                isLast={index === TIMELINE_EVENTS.length - 1}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 28,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  list: {
    paddingBottom: 40,
  },

  timelineSkeleton: {
    marginTop: 18,
    padding: 14,
    borderRadius: 24,
    gap: 10,
    backgroundColor: Colors.surface,
  },
});
