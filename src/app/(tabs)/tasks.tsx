import TaskCard from "@/components/tasks/TaskCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Colors } from "@/constants/theme";
import { Task } from "@/types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TASKS: Task[] = [
  {
    id: "1",
    title: "Take medication",
    category: "Medication",
    time: "8:00 AM",
    status: "completed",
  },
  {
    id: "2",
    title: "Drink water",
    category: "Wellness",
    time: "10:00 AM",
    status: "pending",
  },
  {
    id: "3",
    title: "20 minute walk",
    category: "Exercise",
    time: "4:00 PM",
    status: "pending",
  },
];

export default function TasksScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>

        <Text style={styles.subtitle}>Stay consistent with your health.</Text>

        <SectionHeader title="Today" />

        <FlatList
          data={TASKS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskCard task={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
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
    fontSize: 15,
    color: Colors.textSecondary,
  },

  list: {
    paddingBottom: 40,
  },
});
