import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

const items = [
  { question: "First question?", answer: "First answer." },
  { question: "Second question?", answer: "Second answer." },
];

describe("Accordion", () => {
  it("opens the first item by default", () => {
    render(<Accordion items={items} />);
    const [firstButton, secondButton] = screen.getAllByRole("button");
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
  });

  it("only one item is open at a time, and clicking the open one closes it", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const [firstButton, secondButton] = screen.getAllByRole("button");

    // Opening the second item closes the first (single-open accordion).
    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(firstButton).toHaveAttribute("aria-expanded", "false");

    // Clicking the currently-open item closes it, leaving nothing open.
    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("hides the answer panel when collapsed", () => {
    const { getAllByRole } = render(<Accordion items={items} />);
    const panels = getAllByRole("region", { hidden: true });
    expect(panels[0]).not.toHaveAttribute("hidden");
    expect(panels[1]).toHaveAttribute("hidden");
  });
});
