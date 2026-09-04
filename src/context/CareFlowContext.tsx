import { supabase } from "@/lib/supabase";
import { Appointment, HealthMeasurement, Task } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "tasks";

interface CareFlowContextType {
  tasks: Task[];
  appointments: Appointment[];
  latestHeartRate: HealthMeasurement | null;
  loading: boolean;
  fetchTasks: () => Promise<void>;
  toggleTaskStatus: (taskId: string, currentStatus: string) => Promise<void>;
  //addTask: (task: Omit<Task, "id" | "status">) => void;
  addTask: (
    title: string,
    category: string,
    dueTime: string,
  ) => Promise<{ error: any }>;
  deleteTask: (taskId: string) => void;
  fetchAppointments: () => Promise<void>;
  addAppointment: (
    title: string,
    doctorName: string,
    location: string,
    scheduledAt: string,
  ) => Promise<{ error: any }>;
  recordHealthMeasurement: (
    type: string,
    valueu: number,
    unit: string,
  ) => Promise<{ error: any }>;
}

const CareFlowContext = createContext<CareFlowContextType | null>(null);

export function CareFlowProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [latestHeartRate, setLatestHeartRate] =
    useState<HealthMeasurement | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setTasks(data);
  }, [user]);

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId);

    if (error) fetchTasks();
  };

  const addTask = async (title: string, category: string, dueTime: string) => {
    if (!user) return { error: "No authenticated user" };
    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      title,
      category,
      due_time: dueTime,
      status: "pending",
    });

    if (!error) await fetchTasks();
    return { error };
  };

  const deleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error("Failed to delete task:", error.message);
    }
  };

  const fetchAppointments = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("scheduled_at", { ascending: true });

    if (!error && data) setAppointments(data);
  }, [user]);

  const addAppointment = async (
    title: string,
    doctorName: string,
    location: string,
    scheduledAt: string,
  ) => {
    if (!user) return { error: "No authenticated user" };

    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      title,
      doctor_name: doctorName,
      location,
      scheduled_at: scheduledAt,
    });

    if (!error) await fetchAppointments();
    return { error };
  };

  const fetchLatestHeartRate = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("health_measurements")
      .select("*")
      .eq("user_id", user.id)
      .eq("type", "heart_rate")
      .order("recorded_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) setLatestHeartRate(data);
  }, [user]);

  const recordHealthMeasurement = async (
    type: string,
    value: number,
    unit: string,
  ) => {
    if (!user) return { error: "No authenticated user" };

    const { error } = await supabase.from("health_measurements").insert({
      user_id: user.id,
      type,
      value,
      unit,
    });

    if (!error && type === "heart_rate") await fetchLatestHeartRate();
    return { error };
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        fetchTasks(),
        fetchAppointments(),
        fetchLatestHeartRate(),
      ]).finally(() => setLoading(false));
    } else {
      setTasks([]);
      setAppointments([]);
      setLatestHeartRate(null);
    }
  }, [user, fetchTasks, fetchAppointments, fetchLatestHeartRate]);

  return (
    <CareFlowContext.Provider
      value={{
        tasks,
        fetchTasks,
        toggleTaskStatus,
        addTask,
        deleteTask,
        appointments,
        fetchAppointments,
        addAppointment,
        latestHeartRate,
        loading,
        recordHealthMeasurement,
      }}
    >
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
