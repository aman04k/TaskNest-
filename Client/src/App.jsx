import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch tasks ❌");
      });
  }, []);

  const addTodo = () => {
    if (!task) {
      toast.warning("Task cannot be empty ⚠️");
      return;
    }
    axios
      .post("http://localhost:5000/api/todos", { task })
      .then((res) => {
        setTodos([...todos, res.data]);
        toast.success("Task added successfully! 🎉");
        setTask("");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add task ❌");
      });
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    toast.success("Task updated successfully! ✅");
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
        toast.success("Task deleted successfully! 🗑");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete task ❌");
      });
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-center">✅ To-Do List</h2>
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task..."
        />
        <button className="btn btn-primary mx-2" onClick={addTodo}>Add</button>
      </div>
      <ul className="list-group mt-3">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
