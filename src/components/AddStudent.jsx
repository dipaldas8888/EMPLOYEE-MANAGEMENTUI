import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    dateofBirth: "",
    studentStatus: true,
    status: "ACTIVE",
    classId: "",
  });
  const [errors, setErrors] = useState({});
  // Update the validateForm function
  const validateForm = () => {
    const newErrors = {};

    // Fix name validation - remove the ! operator
    if (student.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    // Email validation
    if (
      !student.email ||
      !student.email.match(/^[a-zA-Z0-9._-]+@gmail\.com$/)
    ) {
      newErrors.email = "Email must be a valid Gmail address";
    }

    // Phone validation
    if (!student.phone || !student.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Class ID validation
    if (!student.classId || student.classId <= 0) {
      newErrors.classId = "Class ID must be a positive number";
    }

    // Date of Birth validation
    if (!student.dateofBirth) {
      newErrors.dateofBirth = "Date of Birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/students",
        student,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => {
                setStudent({ ...student, name: e.target.value });
                if (errors.name) {
                  setErrors({ ...errors, name: "" });
                }
              }}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={student.email}
              onChange={(e) => {
                setStudent({ ...student, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Status
            </label>
            <div className="mt-2">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="studentStatus"
                  checked={student.studentStatus}
                  onChange={(e) =>
                    setStudent({ ...student, studentStatus: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="studentStatus"
                  className="text-sm text-gray-600"
                >
                  Active Student
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={student.phone}
              onChange={(e) => {
                setStudent({ ...student, phone: e.target.value });
                if (errors.phone) {
                  setErrors({ ...errors, phone: "" });
                }
              }}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class ID
            </label>
            <input
              type="number"
              value={student.classId}
              onChange={(e) =>
                setStudent({ ...student, classId: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={student.dateofBirth}
              onChange={(e) =>
                setStudent({ ...student, dateofBirth: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={student.status}
              onChange={(e) =>
                setStudent({ ...student, status: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
              required
            >
              <option value="ACTIVE">Active</option>
              <option value="ON_LEAVE">On Leave</option>
              <option value="TERMINATED">Terminated</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
