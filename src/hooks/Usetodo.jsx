import React, { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2';

export function useTodo() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");

    return stored ? JSON.parse(stored) : [];
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((newTodo) => {
    const todoItem = {
      id: Date.now(),
      text: newTodo.text,
      dueDate: newTodo.dueDate,
      time: newTodo.time,
      category: newTodo.category,
      completed: false,
    };
    setTodos((prev) => [...prev, todoItem]);
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {

          if (!todo.completed) {
            Swal.fire({
              title: "Task Completed",
              text: "You earned 5 points",
              icon: "success",
            });
          }
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }, []);



  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return {
    todos,
    setTodos,
    addTodo,
    toggleComplete,
    deleteTodo,
  };
} 