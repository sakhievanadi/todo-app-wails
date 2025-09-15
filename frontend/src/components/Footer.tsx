import { Dispatch, SetStateAction } from "react";

interface Props {
  activeCount: number;
  onClearCompleted: () => void;
  filter: "all" | "active" | "completed"; // 🔥 добавили
  setFilter: Dispatch<SetStateAction<"all" | "active" | "completed">>; // 🔥 добавили
}

export default function Footer({ activeCount, onClearCompleted, filter, setFilter }: Props) {
  return (
    <footer>
      <span>{activeCount} items left</span>
      <div>
        <button 
          className={filter === "all" ? "selected" : ""} 
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button 
          className={filter === "active" ? "selected" : ""} 
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button 
          className={filter === "completed" ? "selected" : ""} 
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <button onClick={onClearCompleted}>Clear completed</button>
    </footer>
  );
}
