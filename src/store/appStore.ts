import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { timelineStatuses } from "../components/errand/Timeline";
import { initialMessages, runners } from "../data/mockData";
import type { ChatMessage, Mode, PostDraft, Runner, ToastItem } from "../types";

export const maxStatus = timelineStatuses.length - 1;
let toastId = 0;

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
  trackingStatus: number;
  jobStatus: number;
  messages: ChatMessage[];
  toasts: ToastItem[];
  savedRunnerIds: string[];
  unreadNotifications: number;
  setMode: (mode: Mode) => void;
  toggleOnline: () => void;
  updateDraft: (data: Partial<PostDraft>) => void;
  resetDraft: () => void;
  selectRunner: (runner: Runner) => void;
  advanceTrackingStatus: () => void;
  setJobStatus: (status: number) => void;
  addMessage: (message: ChatMessage) => void;
  addToast: (message: string, tone?: ToastItem["tone"]) => void;
  removeToast: (id: number) => void;
  toggleSavedRunner: (id: string) => void;
  markNotificationsRead: () => void;
}

export const useAppStore = create<AppState>()(persist((set, get) => ({
  mode: "requester",
  online: true,
  draft: defaultDraft,
  selectedRunner: runners[0],
  trackingStatus: 4,
  jobStatus: 0,
  messages: initialMessages,
  toasts: [],
  savedRunnerIds: ["brian-kamau", "faith-njeri"],
  unreadNotifications: 3,
  setMode: (mode) => set({ mode }),
  toggleOnline: () => set((state) => ({ online: !state.online })),
  updateDraft: (data) => set((state) => ({ draft: { ...state.draft, ...data } })),
  resetDraft: () => set({ draft: defaultDraft }),
  selectRunner: (selectedRunner) => set({ selectedRunner, trackingStatus: 0 }),
  advanceTrackingStatus: () => set((state) => ({ trackingStatus: Math.min(maxStatus, state.trackingStatus + 1) })),
  setJobStatus: (jobStatus) => set({ jobStatus }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  addToast: (message, tone = "success") => {
    const id = ++toastId;
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
}), {
  name: "tuma-app-state",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    mode: state.mode,
    online: state.online,
    draft: state.draft,
    selectedRunner: state.selectedRunner,
    trackingStatus: state.trackingStatus,
    jobStatus: state.jobStatus,
    savedRunnerIds: state.savedRunnerIds,
    unreadNotifications: state.unreadNotifications,
  }),
}));
