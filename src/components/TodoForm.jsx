import { useState } from "react";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (task.trim() === "") return;

    addTask(task, priority, dueDate);
    setTask("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default TodoForm;