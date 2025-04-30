import React, { useState, useRef } from "react";
import { useTodo } from '../hooks/Usetodo';
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NewTodo() {
  const { addTodo } = useTodo();
  const navigate = useNavigate()
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    time: "",
    date: "",
    todo: "",
    category: "",
    completed: false
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      text: formData.todo,
      dueDate: formData.date,
      time: formData.time,
      category: formData.category,
      completed: false
    };

    addTodo(newTodo);
    Swal.fire({

      text: "Task Added Successfully",
      icon: "success"
    });

    setFormData({
      time: "",
      date: "",
      todo: "",
      category: ""
    });

    formRef.current.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary to-darktheme flex flex-col items-center justify-center px-4 py-10 font-Winky">
      <button onClick={() => navigate("/")} className="absolute top-4 right-4">
        <IoClose className="text-red-700 text-2xl" />
      </button>

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl text-center mb-6 font-semibold text-darktheme">Todo Form</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-darktheme font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border border-primary rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-darktheme font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-primary rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-darktheme font-semibold">Todo</label>
            <input
              type="text"
              name="todo"
              value={formData.todo}
              onChange={handleChange}
              minLength={3}
              placeholder="Enter your task"
              required
              className="w-full border border-primary rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-darktheme font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-primary rounded-lg px-3 py-2"
            >
              <option value="">Select category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTodo;
