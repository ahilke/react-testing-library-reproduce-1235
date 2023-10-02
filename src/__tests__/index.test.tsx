import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "..";

describe("index", () => {
  it("runs", async () => {
    render(<MyComponent />);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
