import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App"; // твой главный компонент

describe("TodoApp", () => {

  test("добавление новой задачи работает", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    await userEvent.type(input, "Протестировать приложение{enter}");

    expect(screen.getByText("Протестировать приложение")).toBeInTheDocument();
  });

  test("переключение completed работает", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    // добавляем задачу
    await userEvent.type(input, "Сделать тест{enter}");

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("фильтрация задач работает", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    // добавляем две задачи
    await userEvent.type(input, "Task 1{enter}");
    await userEvent.type(input, "Task 2{enter}");

    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]); // первую отметили как выполненную

    // фильтр Completed
    await userEvent.click(
        screen.getByRole("button", { name: /^Completed$/i })
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();

    // фильтр Active
    await userEvent.click(screen.getByText(/Active/i));
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });
});
