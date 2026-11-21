import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Counter App", () => {
  test("starts at 0 and shows all three buttons", () => {
    render(<App />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrement" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  test("Increment changes the count from 0 to 1", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("Decrement changes the count from 0 to -1", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  test("Reset changes the count back to 0", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("keeps the right count through a mix of buttons", () => {
    render(<App />);
    const increment = screen.getByRole("button", { name: "Increment" });
    const decrement = screen.getByRole("button", { name: "Decrement" });
    const reset = screen.getByRole("button", { name: "Reset" });

    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(increment);
    expect(screen.getByText("Count: 3")).toBeInTheDocument();

    fireEvent.click(decrement);
    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(reset);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    fireEvent.click(decrement);
    fireEvent.click(decrement);
    expect(screen.getByText("Count: -2")).toBeInTheDocument();
  });
});
