import TaskCard from "@/components/tasks/TaskCard";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeader from "@/components/ui/SectionHeader";
import { Colors } from "@/constants/theme";
import { useCareFlow } from "@/context/CareFlowContext";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TasksScreen() {
  const { tasks, toggleTask, deleteTask } = useCareFlow();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>

        <Text style={styles.subtitle}>Stay consistent with your health.</Text>

        <View style={styles.heading}>
          <SectionHeader title="Today" />

          <Pressable onPress={() => router.push("/add-task")}>
            <Text style={styles.button}>+ Add Task</Text>
          </Pressable>
        </View>

        {tasks.length === 0 && (
          <EmptyState
            title="You're all caught up!"
            description="No tasks remaining for today."
          />
        )}

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
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
  button: {
    backgroundColor: Colors.primary,
    padding: 8,
    alignItems: "center",
    borderRadius: 16,
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  heading: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
