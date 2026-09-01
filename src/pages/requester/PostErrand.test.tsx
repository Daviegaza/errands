import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { PostErrand } from "./PostErrand";

const initialState = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initialState, true);
});

describe("PostErrand", () => {
  it("disables Continue until the task description is long enough, then advances to the category step", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/post"]}>
        <PostErrand />
      </MemoryRouter>,
    );

    const task = screen.getByPlaceholderText(/Pick up a package and bring it to me/);
    const continueButton = screen.getByRole("button", { name: /Continue/ });

    await user.clear(task);
    expect(continueButton).toBeDisabled();

    await user.type(task, "Short");
    expect(continueButton).toBeDisabled();

    await user.type(task, " but now long enough to pass validation");
    expect(continueButton).toBeEnabled();

    await user.click(continueButton);
    expect(await screen.findByRole("heading", { name: "Choose a category" })).toBeInTheDocument();
  });

  it("updates the draft when a different category is chosen on the category step", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/post"]}>
        <PostErrand />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /Continue/ }));
    await screen.findByRole("heading", { name: "Choose a category" });
    expect(useAppStore.getState().draft.category).not.toBe("Pharmacy");

    await user.click(screen.getByRole("button", { name: /Pharmacy/ }));
    expect(useAppStore.getState().draft.category).toBe("Pharmacy");
  });
});
