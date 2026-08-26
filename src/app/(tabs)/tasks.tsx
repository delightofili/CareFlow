import TaskCard from "@/components/tasks/TaskCard";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeader from "@/components/ui/SectionHeader";
import { Colors } from "@/constants/theme";
import { useCareFlow } from "@/context/CareFlowContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TasksScreen() {
  const { tasks, toggleTask } = useCareFlow();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>

        <Text style={styles.subtitle}>Stay consistent with your health.</Text>

        <SectionHeader title="Today" />

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
            <TaskCard task={item} onToggle={() => toggleTask(item.id)} />
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
});
