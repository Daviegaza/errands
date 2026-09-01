import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { runners } from "../../data/mockData";
import { useAppStore } from "../../store/appStore";
import { RunnerCard } from "./RunnerCard";

const initialState = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initialState, true);
});

describe("RunnerCard", () => {
  it("toggles a runner between saved and not saved", async () => {
    const user = userEvent.setup();
    const runner = runners.find((r) => r.id === "kevin-mwangi")!;
    render(
      <MemoryRouter>
        <RunnerCard runner={runner} />
      </MemoryRouter>,
    );

    expect(useAppStore.getState().savedRunnerIds).not.toContain(runner.id);

    await user.click(screen.getByRole("button", { name: "Save runner" }));
    expect(useAppStore.getState().savedRunnerIds).toContain(runner.id);

    await user.click(screen.getByRole("button", { name: "Remove saved runner" }));
    expect(useAppStore.getState().savedRunnerIds).not.toContain(runner.id);
  });

  it("calls onAccept when the offer is accepted", async () => {
    const user = userEvent.setup();
    const runner = runners[0];
    let accepted = false;
    render(
      <MemoryRouter>
        <RunnerCard runner={runner} onAccept={() => { accepted = true; }} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Accept offer" }));
    expect(accepted).toBe(true);
  });
});
