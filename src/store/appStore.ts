import { create } from "zustand";
import { initialMessages, runners } from "../data/mockData";
import type { ChatMessage, Mode, PostDraft, Runner, ToastItem } from "../types";

const defaultDraft: PostDraft = {
  task: "Pick up my laptop charger from Westlands and bring it to Kilimani.",
  category: "Pickup & Delivery",
  pickup: "Sarit Centre, Westlands",
  destination: "Yaya Centre, Kilimani",
  when: "Now",
  scheduleDate: "",
  budget: 750,
  instructions: "Ask for Amara at the main reception desk. Keep the charger in its pouch.",
  contact: "Message me in the app if reception needs confirmation.",
  photos: [],
};

interface AppState {
  mode: Mode;
  online: boolean;
  draft: PostDraft;
  selectedRunner: Runner | null;
  activeStatus: number;
  messages: ChatMessage[];
  toasts: ToastItem[];
  savedRunnerIds: string[];
  unreadNotifications: number;
  setMode: (mode: Mode) => void;
  toggleOnline: () => void;
  updateDraft: (data: Partial<PostDraft>) => void;
  resetDraft: () => void;
  selectRunner: (runner: Runner) => void;
  advanceStatus: () => void;
  setStatus: (status: number) => void;
  addMessage: (message: ChatMessage) => void;
  addToast: (message: string, tone?: ToastItem["tone"]) => void;
  removeToast: (id: number) => void;
  toggleSavedRunner: (id: string) => void;
  markNotificationsRead: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  mode: "requester",
  online: true,
  draft: defaultDraft,
  selectedRunner: runners[0],
  activeStatus: 4,
  messages: initialMessages,
  toasts: [],
  savedRunnerIds: ["brian-kamau", "faith-njeri"],
  unreadNotifications: 3,
  setMode: (mode) => set({ mode }),
  toggleOnline: () => set((state) => ({ online: !state.online })),
  updateDraft: (data) => set((state) => ({ draft: { ...state.draft, ...data } })),
  resetDraft: () => set({ draft: defaultDraft }),
  selectRunner: (selectedRunner) => set({ selectedRunner, activeStatus: 0 }),
  advanceStatus: () => set((state) => ({ activeStatus: Math.min(7, state.activeStatus + 1) })),
  setStatus: (activeStatus) => set({ activeStatus }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  addToast: (message, tone = "success") => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }));
    window.setTimeout(() => get().removeToast(id), 3200);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
  toggleSavedRunner: (id) =>
    set((state) => ({
      savedRunnerIds: state.savedRunnerIds.includes(id)
        ? state.savedRunnerIds.filter((runnerId) => runnerId !== id)
        : [...state.savedRunnerIds, id],
    })),
  markNotificationsRead: () => set({ unreadNotifications: 0 }),
}));
