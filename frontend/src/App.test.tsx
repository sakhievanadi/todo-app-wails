import { render, screen } from "@testing-library/react";
import App from "./App";

test("рендерит заголовок todos", () => {
  render(<App />);
  const headerElement = screen.getByText(/todos/i);
  expect(headerElement).toBeInTheDocument();
});
