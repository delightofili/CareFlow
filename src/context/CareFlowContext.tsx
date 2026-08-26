import { getData, saveData } from "@/services/storage";
import { Task } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "tasks";

const INITIAL_TASKS: Task[] = [
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

interface CareFlowContextType {
  tasks: Task[];
  toggleTask: (id: string) => void;
}

const CareFlowContext = createContext<CareFlowContextType | null>(null);

export function CareFlowProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  useEffect(() => {
    async function loadInitialTasks() {
      try {
        const storedTasks = await getData<Task[]>(STORAGE_KEY);
        if (storedTasks !== null) {
          setTasks(storedTasks);
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    }
    loadInitialTasks();
  }, []);
  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === id) {
        const nextStatus = t.status === "completed" ? "pending" : "completed";
        return { ...t, status: nextStatus };
      }
      return t;
    });

    setTasks(updatedTasks);
    await saveData(STORAGE_KEY, updatedTasks);
  };

  return (
    <CareFlowContext.Provider value={{ tasks, toggleTask }}>
      {children}
    </CareFlowContext.Provider>
  );
}

export function useCareFlow() {
  const context = useContext(CareFlowContext);

  if (!context) {
    throw new Error("useCareFlow must be used inside CareFlowProvider");
  }

  return context;
}
