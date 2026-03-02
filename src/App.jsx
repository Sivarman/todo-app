import { useState,useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./index.css";

function App() {
  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
});
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Task
  const addTask = (task, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: task,
      priority,
      dueDate,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit Task
  const editTask = (id, updatedText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      )
    );
  };

  // Filter Logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true; // "All"
  });

  return (
    <div className="container">
      <h1>📝 Todo List</h1>

      <TodoForm addTask={addTask} />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;