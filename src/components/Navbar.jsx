import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">
                Student Management System
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Students List
                </Link>
                <Link
                  to="/add"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Student
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium"
          >
            Students List
          </Link>
          <Link
            to="/add"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
