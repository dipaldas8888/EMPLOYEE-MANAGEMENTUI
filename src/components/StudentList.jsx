import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/students");
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch students");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8080/students/${id}`);
        setStudents(students.filter((student) => student.id !== id));
      } catch (err) {
        setError(err.response?.data || "Failed to delete student");
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Student
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Class ID</th>{" "}
              <th className="py-3 px-4 text-left">Student Status</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.phone}</td>
                <td className="py-3 px-4">{student.dateofBirth}</td>
                <td className="py-3 px-4">{student.classId}</td>{" "}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      student.studentStatus
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {student.studentStatus ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      student.status === "ACTIVE"
                        ? "bg-green-200 text-green-800"
                        : student.status === "ON_LEAVE"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-500 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <Link
                      to={`/view/${student.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${student.id}`}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
