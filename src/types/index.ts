export type Mode = "requester" | "runner";

export type Category =
  | "Shopping"
  | "Pickup & Delivery"
  | "Store Run"
  | "Documents"
  | "Pharmacy"
  | "Laundry"
  | "Small Moving"
  | "Custom Errand";

export interface Runner {
  id: string;
  name: string;
  initials: string;
  photo: string;
  rating: number;
  completed: number;
  distance: string;
  eta: string;
  offer: number;
  message: string;
  reliability: number;
  verified: boolean;
  specialties: string[];
  color: string;
  responseTime: string;
  memberSince: string;
}

export interface Errand {
  id: string;
  category: Category;
  title: string;
  description: string;
  pickup: string;
  destination: string;
  budget: number;
  distance: string;
  posted: string;
  urgency: "NOW" | "URGENT" | "SCHEDULED";
  requester: string;
  requesterRating: number;
  status: "active" | "upcoming" | "completed" | "cancelled" | "open";
  runner?: Runner;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "runner" | "system";
  text: string;
  time: string;
  type?: "text" | "voice" | "location" | "image";
}

export interface ToastItem {
  id: number;
  message: string;
  tone?: "success" | "info" | "warning";
}

export interface PostDraft {
  task: string;
  category: Category;
  pickup: string;
  destination: string;
  when: "Now" | "Today" | "Schedule";
  scheduleDate: string;
  budget: number;
  instructions: string;
  contact: string;
  photos: string[];
}
