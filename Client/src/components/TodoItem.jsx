import React, { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const toggleComplete = () => {
    axios
      .put(`http://localhost:5000/api/todos/${todo._id}`, {
        task: todo.task,
        completed: !todo.completed,
      })
      .then((res) => onUpdate(res.data))
      .catch((err) => console.error(err));
  };

  // ✅ Update Task
  const saveEdit = () => {
    axios
      .put(`http://localhost:5000/api/todos/${todo._id}`, {
        task: updatedTask,
        completed: todo.completed,
      })
      .then((res) => {
        onUpdate(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center p-3 rounded shadow-sm ${
        todo.completed ? "bg-light text-muted" : "bg-white"
      }`}
      style={{
        transition: "0.3s",
        borderLeft: todo.completed ? "5px solid green" : "5px solid #007bff",
      }}
    >
      {isEditing ? (
        <input
          type="text"
          className="form-control"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          autoFocus
        />
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            fontSize: "1.1rem",
            fontWeight: "500",
            cursor: "pointer",
            flexGrow: 1,
          }}
          onClick={toggleComplete}
        >
          {todo.task}
        </span>
      )}

      <div className="d-flex gap-2">
        {isEditing ? (
          <button className="btn btn-success btn-sm px-3" onClick={saveEdit}>
            ✅ Save
          </button>
        ) : (
          <button
            className="btn btn-warning btn-sm px-3"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        )}
        <button className="btn btn-danger btn-sm px-3" onClick={() => onDelete(todo._id)}>
          🗑 Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
