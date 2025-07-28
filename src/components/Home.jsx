import React, { useState } from 'react';
import { MdOutlineBackspace, MdMenu } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../components/Themecontext";
import { FiMoon, FiSun } from "react-icons/fi";
import { BsTrophyFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';


import { useTodo } from "../hooks/Usetodo";
import TodoItem from "./TodoItem";

function Home() {
  const { theme, toggleTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchterm, setSearchterm] = useState('');
  const [category, setCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const navigate = useNavigate();

  const { todos, deleteTodo, toggleComplete } = useTodo();
  const now = new Date();

  const getFilteredTodos = () => {
    return todos.filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchterm.toLowerCase());
      const matchesCategory = category === 'All' || todo.category === category;
      const dueDateTime = new Date(`${todo.dueDate}T${todo.time}`);

      const isInactive = !todo.completed && now > dueDateTime;
      const isActive = !todo.completed && now <= dueDateTime;
      const isCompleted = todo.completed;

      let matchesFilter = true;
      if (filterType === 'Active') matchesFilter = isActive;
      else if (filterType === 'Completed') matchesFilter = isCompleted;
      else if (filterType === 'Inactive') matchesFilter = isInactive;

      return matchesSearch && matchesCategory && matchesFilter;
    });
  };

  const filteredTodos = getFilteredTodos();
  const uniqueCategories = ['All', ...new Set(todos.map(todo => todo.category))];
  const filterOptions = ['All', 'Active', 'Completed', 'Inactive'];

  return (
    <div className={`w-full h-auto font-Wink`}>
      <div className={`m-4 h-auto rounded-xl border p-6 shadow-2xl shadow-primary ${theme === 'light' ? 'bg-white' : 'bg-[#191F36]'}`}>
      
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-3xl text-primary  transition"
            aria-label="Toggle Sidebar"
          >
            <MdMenu />
          </button>
          <h1 className={`text-2xl font-semibold text-${theme === 'light' ? 'black' : 'white'}`}>
            Plan <span className="text-primary">Your Day</span>
          </h1>
        </div>


        <div className="grid grid-cols-12 gap-4 min-h-screen ">

          {showSidebar && (
            <div className="col-span-12 sm:col-span-2 bg-gradient-to-r from-primary to-white p-4 shadow-md rounded-lg">
              <ul className="space-y-4 flex flex-col">

                <li>
                  <button
                    onClick={() => navigate('/achivements')}
                    className="flex items-center gap-2 text-darktheme hover:text-blue-700 font-medium transition-colors"
                  >
                    <BsTrophyFill className="text-lg text-yellow-700" />
                    Dashboard
                  </button>
                </li>

                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-darktheme hover:text-blue-700 font-medium transition-colors"
                  >
                    {theme === 'dark' ? <FiMoon className="text-lg" /> : <FiSun className="text-lg text-white" />}
                    Theme
                  </button>
                </li>

              </ul>
            </div>

          )}

          {/* content */}
          <div
            className={`transition-all duration-300 p-6
    ${showSidebar ? 'col-span-12 sm:col-span-10' : 'col-span-12'}
  `}
          >


            <div className="flex flex-row items-start justify-between mb-4">
              <div className="flex flex-row items-center gap-4">
                <input
                  type="text"
                  className="w-32 sm:w-64 p-2 rounded-lg border-2 border-blue-500 bg-white text-black outline-none"
                  placeholder="Search..."
                  value={searchterm}
                  onChange={(e) => setSearchterm(e.target.value)}
                />
                <button
                  className="p-2 border border-blue-500 rounded-lg hover:bg-primary transition"
                  aria-label="Clear search"
                  onClick={() => setSearchterm('')}
                >
                  <MdOutlineBackspace className={`text-2xl  text-${theme === 'light' ? 'black' : 'white'}`} />
                </button>
              </div>

              <button
                data-tooltip-id="create-tooltip"
                data-tooltip-content="Create To do"
                className="p-2 rounded-full hover:bg-primary transition"
                aria-label="Create"
                onClick={() => navigate('/create')}
              >
                <FaCalendarAlt className={`text-3xl ${theme === 'light' ? 'text-black' : 'text-white'}`} />
              </button>

              <Tooltip
                id="create-tooltip"
                place="top"
                style={{ backgroundColor: theme === 'light' ? '#000' : '#fff', color: theme === 'light' ? '#fff' : '#000' }}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-row gap-4 items-start justify-between mt-4">
              <div className="flex flex-col w-full">
                <label className={`mb-1 text-sm font-medium text-${theme === 'light' ? 'black' : 'white'}`}>Category</label>
                <select
                  className="border-2 border-primary p-2 rounded-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className={`mb-1 text-sm font-medium text-${theme === 'light' ? 'black' : 'white'} `}>Status</label>
                <select
                  className="border-2 border-primary rounded-md p-2 focus:outline-none"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/*list */}
            <div className="mt-8 px-4 font-Poppins font-bold text-sm   ">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4
              ">
                {filteredTodos.length > 0 ? (
                  filteredTodos.map((todo) => (
                    <div key={todo.id}>
                      <TodoItem
                        todo={todo}
                        onDelete={deleteTodo}
                        onToggle={toggleComplete}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No Task To Do</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
