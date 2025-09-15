import React, { useState, useEffect, useContext } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { Todo } from "./types"; // Подключаем тип Todo
import ThemeContext from "./contexts/ThemeContext";
import dayModeIcon from './img/day-mode.png'; // Путь к изображению для дня
import nightModeIcon from './img/night-mode.png'; // Путь к изображению для ночи

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

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
  }, []); // Этот эффект сработает один раз при монтировании компонента

  // Сохраняем задачи в localStorage при изменении состояния
  useEffect(() => {
    if (todos.length > 0) {
      console.log("Сохраняем задачи в localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));  // Сохраняем задачи
    }
  }, [todos]); // Этот эффект сработает каждый раз, когда изменяется список задач

  // Функция добавления задачи
  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // Функция переключения состояния задачи
  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Функция очистки выполненных задач
  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  // Получаем контекст для темы
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return <div>Error: ThemeContext not found!</div>;
  }

  const { theme, toggleTheme } = themeContext;

  const activeCount = todos.filter(t => !t.completed).length;

  // Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;  // all
  });

  // Функция для переключения темы
  const handleThemeToggle = () => {
    toggleTheme();  // Переключаем тему
    // Устанавливаем изображение в localStorage, чтобы тема сохранялась
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <h1>todos</h1>
      <div className={`card ${theme}`}>
        <div className="todoapp">
          <TodoInput onAdd={addTodo} />
          <TodoList todos={filteredTodos} onToggle={toggleTodo} />
          {todos.length > 0 && (
            <Footer
              activeCount={activeCount}
              onClearCompleted={clearCompleted}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>
      <div className="theme-toggle">
        <img 
          src={theme === 'light' ? nightModeIcon : dayModeIcon} 
          alt="Toggle Theme" 
          onClick={handleThemeToggle} 
          style={{ cursor: 'pointer', width: '40px', height: '40px' }} 
        />
      </div>
    </div>
  );
}
