import { Todo } from "../types";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <motion.li
      className={todo.completed ? "completed" : ""}
      initial={{ opacity: 0, y: -10 }}      // появление сверху
      animate={{ opacity: 1, y: 0 }}        // плавный вход
      exit={{ opacity: 0, y: 10 }}          // исчезновение вниз
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="checkmark"></span>
      </label>
      <span>{todo.text}</span>
    </motion.li>
  );
}

