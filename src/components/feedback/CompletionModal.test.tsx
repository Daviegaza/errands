import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CompletionModal } from "./CompletionModal";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("CompletionModal", () => {
  it("shows the thank-you screen after submitting a rating", async () => {
    const user = userEvent.setup();
    render(<CompletionModal open onClose={() => {}} />);

    await user.click(screen.getByRole("button", { name: "5 stars" }));
    await user.click(screen.getByRole("button", { name: "Submit rating" }));

    expect(await screen.findByText("That’s all sorted.")).toBeInTheDocument();
  });

  it("resets to a fresh rating form the next time it opens, instead of showing a stale thank-you screen", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<CompletionModal open onClose={() => {}} />);

    await user.click(screen.getByRole("button", { name: "5 stars" }));
    await user.click(screen.getByRole("button", { name: "Submit rating" }));
    expect(await screen.findByText("That’s all sorted.")).toBeInTheDocument();

    rerender(<CompletionModal open={false} onClose={() => {}} />);
    await sleep(350);

    rerender(<CompletionModal open onClose={() => {}} />);

    await waitFor(() => expect(screen.getByText("How was your experience?")).toBeInTheDocument());
    expect(screen.queryByText("That’s all sorted.")).not.toBeInTheDocument();
  });
});
