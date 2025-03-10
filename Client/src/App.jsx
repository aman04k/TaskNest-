import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = () => {
    if (!task) return;
    axios.post("http://localhost:5000/api/todos", { task })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.error(err));
    setTask("");
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
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
