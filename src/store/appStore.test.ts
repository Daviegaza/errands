import { beforeEach, describe, expect, it, vi } from "vitest";
import { runners } from "../data/mockData";
import { maxStatus, useAppStore } from "./appStore";

const initialState = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initialState, true);
});

describe("appStore", () => {
  it("selecting a runner resets tracking status to 0", () => {
    useAppStore.getState().advanceTrackingStatus();
    useAppStore.getState().advanceTrackingStatus();
    expect(useAppStore.getState().trackingStatus).toBeGreaterThan(0);

    useAppStore.getState().selectRunner(runners[2]);

    expect(useAppStore.getState().selectedRunner?.id).toBe(runners[2].id);
    expect(useAppStore.getState().trackingStatus).toBe(0);
  });

  it("advancing tracking status never exceeds the final timeline step", () => {
    for (let i = 0; i < maxStatus + 5; i++) {
      useAppStore.getState().advanceTrackingStatus();
    }
    expect(useAppStore.getState().trackingStatus).toBe(maxStatus);
  });

  it("toggles a saved runner id on and off", () => {
    const id = "kevin-mwangi";
    expect(useAppStore.getState().savedRunnerIds).not.toContain(id);

    useAppStore.getState().toggleSavedRunner(id);
    expect(useAppStore.getState().savedRunnerIds).toContain(id);

    useAppStore.getState().toggleSavedRunner(id);
    expect(useAppStore.getState().savedRunnerIds).not.toContain(id);
  });

  it("does not duplicate an already-saved runner id", () => {
    const id = runners[0].id;
    const before = useAppStore.getState().savedRunnerIds.filter((savedId) => savedId === id).length;
    useAppStore.getState().toggleSavedRunner(id);
    const after = useAppStore.getState().savedRunnerIds.filter((savedId) => savedId === id).length;
    expect(after).toBe(before === 1 ? 0 : 1);
  });

  it("auto-dismisses a toast after its timeout", () => {
    vi.useFakeTimers();
    useAppStore.getState().addToast("Hello");
    expect(useAppStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(3200);
    expect(useAppStore.getState().toasts).toHaveLength(0);
    vi.useRealTimers();
  });

  it("marking notifications read zeroes the unread count", () => {
    expect(useAppStore.getState().unreadNotifications).toBeGreaterThan(0);
    useAppStore.getState().markNotificationsRead();
    expect(useAppStore.getState().unreadNotifications).toBe(0);
  });

  it("resetting the draft restores the default post draft", () => {
    useAppStore.getState().updateDraft({ task: "Something completely different", budget: 9999 });
    expect(useAppStore.getState().draft.budget).toBe(9999);

    useAppStore.getState().resetDraft();
    expect(useAppStore.getState().draft.budget).toBe(initialState.draft.budget);
    expect(useAppStore.getState().draft.task).toBe(initialState.draft.task);
  });
});
