export type TaskStatus = "completed" | "pending";

export interface Task {
  id: string;
  title: string;
  category: string;
  time: string;
  status: string;
}

export interface Appointment {
  id: string;
  title: string;
  doctor: string;
  time: string;
  type: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "appointment" | "medication" | "task";
}
