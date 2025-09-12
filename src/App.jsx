import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.css";
import {
  IoMdHome,
  IoMdFolder,
  IoMdCalendar,
  IoMdDocument,
  IoMdStats,
  IoMdClose,
} from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  /* nav items  */
  const navItems = [
    { name: "Dashboard", icon: <IoMdHome /> },
    { name: "Projects", icon: <IoMdFolder /> },
    { name: "Calender", icon: <IoMdCalendar /> },
    { name: "Documents", icon: <IoMdDocument /> },
    { name: "Reports", icon: <IoMdStats /> },
  ];

  /* fetch users from api */
useEffect(() => {
  setLoading(true);
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
}, []);

  return (
    <div
      className={`flex h-screen bg-gray-100 ${
        darkMode ? "dark" : ""
      } dark:bg-gray-900`}
    >
      <div
        className={`fixed w-64 h-screen bg-white shadow transform transition-transform duration-300 ease-in-out
   ${
     sideBarOpen ? "translate-x-0" : "-translate-x-64"
   } lg:translate-x-0 lg:static dark:bg-gray-900`}
      >
        <div className="flex justify-between p-4">
          <div className="text-xl font-bold dark:text-gray-100">Logo</div>
          <button
            className="lg:hidden dark:text-gray-100"
            onClick={() => {
              setSideBarOpen(false);
            }}
          >
            <IoMdClose className="w-6 h-6 text-black-500" />
          </button>
        </div>
        {/* navbar starts here   */}
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            return (
              <div className="flex p-2 hover:bg-gray-100">
                <div className="text-xl dark:text-gray-100">{item.icon}</div>
                <div className="pl-2 text-sm font-bold dark:text-gray-100 dark:hover:text-gray-900">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* main content starts here */}

      <main className="relative z-10 flex-1 overflow-y-auto">
        <header className="flex justify-between p-4 bg-white dark:bg-gray-900">
          <button
            className="p-2 text-xl font-bold lg:hidden dark:text-gray-100"
            onClick={() => setSideBarOpen(true)}
          >
            <IoMdMenu />
          </button>

          {/* search bar in here  */}
          <div className="w-full p-4">
            <input
              type="text"
              placeholder="search by name, phone, email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* dark mode here  */}

          <div className="flex p-4 text-2xl justify-left">
            {darkMode ? (
              <button
                className="p-2"
                onClick={() => {
                  setDarkMode(false);
                }}
              >
                <CiLight size={25} color="white" />
              </button>
            ) : (
              <button
                className="p-2"
                onClick={() => {
                  setDarkMode(true);
                }}
              >
                <MdDarkMode size={25} />
              </button>
            )}
          </div>
        </header>

        {/* all cards here */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {users
            .filter((user) => {
              const query = search.toLowerCase();
              return (
                user.name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone.toLowerCase().includes(query)
              );
            })
            .map((user) => (
              <div
                key={user.id}
                className="p-6 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-800"
              >
                <h2 className="text-xl font-bold dark:text-gray-100">
                  {user.name}
                </h2>
                <p className="p-1 text-gray-700 text-l dark:text-gray-100">
                  Username: {user.username}
                </p>
                <p className="p-1 text-gray-700 text-l dark:text-gray-100">
                  Email: {user.email}
                </p>
                <p className="p-1 text-gray-700 text-l dark:text-gray-100">
                  Phone: {user.phone}
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
