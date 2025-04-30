import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto h-auto flex flex-col justify-between p-4 bg-white backdrop-blur-md rounded-xl shadow-xl border-2 border-primary mb-6 ">



      <button
        onClick={() => onToggle(todo.id)}
        className={`absolute -top-3 left-4 p-2 rounded-full shadow-md border-2 ${todo.completed ? 'bg-green-600' : 'bg-teal-500'
          }`}
      >
        <FaCheckCircle className="text-white text-base sm:text-lg" />
      </button>


      <div className="h-24 bg-white/10 backdrop-blur-md border  rounded-lg mt-6 p-4 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base mb-2 font-Poppins font-semibold text-darktheme">
          <p>{todo.dueDate}</p>
          <p>{todo.time}</p>
        </div>

        <div className="text-sm sm:text-base font-Poppins font-semibold text-darktheme">
          <p>{todo.text}</p>
        </div>
      </div>

      
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          <MdDelete className="text-xl sm:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
