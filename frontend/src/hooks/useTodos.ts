import { useState, useEffect } from "react";
import { Todo } from "../types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Загружаем задачи из localStorage при монтировании компонента
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        // Если в localStorage есть данные, пытаемся их распарсить
        setTodos(JSON.parse(savedTodos)); 
        console.log("Задачи загружены из localStorage:", JSON.parse(savedTodos));
      } else {
        console.log("Задач в localStorage нет");
      }
    } catch (error) {
      // Если ошибка при парсинге данных, очищаем localStorage и выводим ошибку
      console.error("Ошибка при загрузке задач из localStorage:", error);
      localStorage.removeItem("todos");  // Очистим поврежденные данные
      setTodos([]);  // Установим пустой список задач
    }
  }, []);

  // Сохраняем задачи в localStorage при изменении состояния
  useEffect(() => {
    if (todos.length > 0) {
      console.log("Сохраняем задачи в localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));  // Сохраняем задачи
    }
  }, [todos]);

  // Добавление новой задачи
  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // Переключение состояния выполнения задачи
  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Очистка выполненных задач
  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  return { todos, addTodo, toggleTodo, clearCompleted };
}
