export type TaskStatus = "completed" | "pending";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  category: string;
  due_time: string;
  status: string;
  created_at?: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  created_at?: string;
}

export interface HealthMeasurement {
  id: string;
  user_id: string;
  type: string;
  value: number;
  unit: string;
  recorded_at?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "appointment" | "medication" | "task";
}
