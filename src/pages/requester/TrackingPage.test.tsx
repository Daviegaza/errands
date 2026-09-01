import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { runners } from "../../data/mockData";
import { useAppStore } from "../../store/appStore";
import { TrackingPage } from "./TrackingPage";

const initialState = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initialState, true);
});

describe("TrackingPage", () => {
  it("reflects the actually selected runner's name, not a hardcoded one", () => {
    const faith = runners.find((runner) => runner.id === "faith-njeri")!;
    useAppStore.setState({ selectedRunner: faith });

    render(
      <MemoryRouter initialEntries={["/tracking/errand-1"]}>
        <TrackingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Message Faith")).toBeInTheDocument();
    expect(screen.getByText(/Faith is following the best route/)).toBeInTheDocument();
    expect(screen.queryByText("Message Brian")).not.toBeInTheDocument();
    expect(screen.queryByText(/Brian is following/)).not.toBeInTheDocument();
  });

  it("still shows Brian by default when Brian is the selected runner", () => {
    const brian = runners.find((runner) => runner.id === "brian-kamau")!;
    useAppStore.setState({ selectedRunner: brian });

    render(
      <MemoryRouter initialEntries={["/tracking/errand-1"]}>
        <TrackingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Message Brian")).toBeInTheDocument();
  });
});
