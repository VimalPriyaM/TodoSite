import { useTodo } from '../hooks/Usetodo';
import { FaCheckCircle, FaExclamationTriangle, FaTrophy } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Achievements() {
  const { todos } = useTodo();
  const navigate = useNavigate()

  const completedTodos = todos.filter((todo) => todo.completed);
  const inactiveTodos = todos.filter((todo) => {
    const due = new Date(`${todo.dueDate} ${todo.time}`);
    return !todo.completed && new Date() > due;
  });

  const points = completedTodos.length * 5 - inactiveTodos.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-darktheme to-primary flex flex-col items-center justify-center px-4 py-10 font-Poppins">
      <button onClick={() => navigate("/")} className="absolute top-4 right-4">
        <IoClose className="text-red-700 text-2xl" />
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl sm:text-3xl text-center font-Winky text-darktheme mb-4">Achievements</h2>

        <div className="bg-primary text-white rounded-xl p-4 shadow font-semibold flex items-center gap-3 text-sm sm:text-base">
          <FaCheckCircle size={24} className="text-green-600" />
          <span>Completed Tasks: {completedTodos.length}</span>
        </div>

        <div className="bg-yellow-300 text-darktheme rounded-xl p-4 shadow font-semibold flex items-center gap-3 text-sm sm:text-base">
          <FaExclamationTriangle size={24} className="text-red-800" />
          <span>Inactive Tasks: {inactiveTodos.length}</span>
        </div>

        <div className="bg-green-400 text-white rounded-xl p-4 shadow font-semibold flex items-center gap-3 text-sm sm:text-base">
          <FaTrophy size={24} className="text-yellow-500" />
          <span>Points Earned: {points}</span>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
