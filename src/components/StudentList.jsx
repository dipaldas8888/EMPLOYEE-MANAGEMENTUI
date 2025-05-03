import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getStudentsAPI } from "../apis/apis";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    classId: "",
    studentStatus: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 3,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      let currentPage =
        params.page !== undefined ? params.page : pagination.currentPage;
      let pageSize = pagination.pageSize;

      const response = await getStudentsAPI(
        currentPage,
        pageSize,
        params.classId,
        params.studentStatus
      );

      setPagination((prev) => ({
        ...prev,
        currentPage: response.data.number,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      }));

      setStudents(response.data.content || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    fetchStudents({ ...filters, page: newPage });
  };
  const handleFilter = (e) => {
    e.preventDefault();

    if (filters.classId && filters.studentStatus !== "") {
      fetchStudents(filters);
    } else {
      fetchStudents();
    }
  };
  const handleReset = () => {
    setFilters({
      classId: "",
      studentStatus: "",
    });
    fetchStudents();
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
      <div className="bg-white p-4 mb-6 rounded shadow">
        <form onSubmit={handleFilter} className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class ID
            </label>
            <input
              type="number"
              value={filters.classId}
              onChange={(e) =>
                setFilters({ ...filters, classId: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter Class ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Status
            </label>
            <select
              value={filters.studentStatus}
              onChange={(e) =>
                setFilters({ ...filters, studentStatus: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Class ID</th>
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
                <td className="py-3 px-4">{student.classId}</td>
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
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing {students.length} of {pagination.totalElements} students
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 0}
            className={`px-3 py-1 rounded ${
              pagination.currentPage === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`px-3 py-1 rounded ${
                pagination.currentPage === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages - 1}
            className={`px-3 py-1 rounded ${
              pagination.currentPage === pagination.totalPages - 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
