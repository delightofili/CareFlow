import AppointmentCard from "@/components/home/AppointmentCard";
import HealthMetric from "@/components/home/HealthMetric";
import ProgressCard from "@/components/home/ProgressCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Skeleton from "@/components/ui/Skeleton";
import { spacing } from "@/constants/spacing";
import { Colors } from "@/constants/theme";
import { useCareFlow } from "@/context/CareFlowContext"; // 👈 Import CareFlow Context
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const {
    tasks,
    appointments,
    latestHeartRate,
    loading,
    fetchTasks,
    fetchAppointments,
  } = useCareFlow();

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchTasks(), fetchAppointments()]);
    setRefreshing(false);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const nextAppointment = appointments[0];

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const greetingStle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, 200], [1, 0.6]);
    const translateY = interpolate(scrollY.value, [0, 200], [0, -20]);
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        <Animated.View entering={FadeInDown.duration(500)}>
          <Animated.View style={greetingStle}>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.subtitle}>Here's how you're doing today.</Text>
          </Animated.View>
        </Animated.View>

        {/* Progress Card Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          {loading ? (
            <View style={styles.progressSkeleton}>
              <Skeleton width="50%" height={12} />
              <Skeleton width="70%" height={20} borderRadius={6} />
              <Skeleton width="30%" height={52} borderRadius={8} />
              <Skeleton width="100%" height={7} borderRadius={10} />
              <Skeleton width="55%" height={12} />
            </View>
          ) : (
            <ProgressCard
              percentage={progressPercentage}
              completed={completedTasks}
              total={totalTasks}
            />
          )}
        </Animated.View>

        {/* Today's Health Section */}
        <Animated.View entering={FadeInUp.delay(200).duration(500)}>
          <SectionHeader title="Today's Health" />

          <View style={styles.metrics}>
            {loading ? (
              <>
                <View style={styles.metricSkeleton}>
                  <Skeleton width={28} height={28} borderRadius={10} />
                  <Skeleton width="60%" height={12} />
                  <Skeleton width="45%" height={18} />
                </View>
                <View style={styles.metricSkeleton}>
                  <Skeleton width={28} height={28} borderRadius={10} />
                  <Skeleton width="60%" height={12} />
                  <Skeleton width="45%" height={18} />
                </View>
              </>
            ) : (
              <>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => router.push("/record-health" as any)}
                >
                  <HealthMetric
                    icon="heart"
                    unit={latestHeartRate ? latestHeartRate.unit : "bpm"}
                    value={
                      latestHeartRate ? String(latestHeartRate.value) : "--"
                    }
                    label="Heart rate"
                  />
                </Pressable>

                <HealthMetric
                  icon="water"
                  unit="glasses"
                  value="4 / 8"
                  label="Water"
                />
              </>
            )}
          </View>
        </Animated.View>

        {/* Upcoming Appointments Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <SectionHeader title="Upcoming" action="View all" />

          {loading ? (
            <View style={styles.appointmentSkeleton}>
              <View style={{ flex: 1 }}>
                <Skeleton width="70%" height={16} />
                <Skeleton width="45%" height={12} borderRadius={6} />
                <Skeleton width="35%" height={12} borderRadius={6} />
              </View>
              <Skeleton width={60} height={28} borderRadius={14} />
            </View>
          ) : nextAppointment ? (
            <AppointmentCard appointment={nextAppointment} />
          ) : (
            <Text style={styles.emptyText}>No upcoming appointments.</Text>
          )}
        </Animated.View>
      </Animated.ScrollView>
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
  progressSkeleton: {
    marginTop: 24,
    padding: 22,
    borderRadius: 24,
    gap: 14,
    backgroundColor: Colors.surface,
  },
  metricSkeleton: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    gap: 10,
    backgroundColor: Colors.surface,
  },
  appointmentSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    gap: 16,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginVertical: 12,
  },
});
