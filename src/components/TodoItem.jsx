import { useState } from "react";

function TodoItem({ todo, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (newText.trim() === "") return;
    editTask(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <div className="todo-content">
            <h4>{todo.text}</h4>
            <small>
              Priority: {todo.priority} | Due: {todo.dueDate || "N/A"}
            </small>
          </div>

          <div className="actions">
            <button
              className="complete-btn"
              onClick={() => toggleTask(todo.id)}
            >
              {todo.completed ? "✔" : "☐"}
            </button>

            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(todo.id)}
            >
              ❌
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;