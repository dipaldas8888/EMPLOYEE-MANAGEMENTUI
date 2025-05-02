import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function ViewStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/students/${id}`);
        if (!response.ok) {
          throw new Error("Student not found");
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!student) {
    return <div className="text-center mt-8">Student not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Details</h2>
        <div className="space-x-4">
          <Link
            to={`/edit/${id}`}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </Link>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
            <p className="mt-1 text-lg">
              {student.firstName} {student.lastName}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-lg">{student.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
            <p className="mt-1 text-lg">{student.rollNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Grade</h3>
            <p className="mt-1 text-lg">{student.grade}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p
              className={`mt-1 inline-block px-2 py-1 rounded text-sm ${
                student.status === "ACTIVE"
                  ? "bg-green-200 text-green-800"
                  : student.status === "INACTIVE"
                  ? "bg-red-200 text-red-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {student.status}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
            <p className="mt-1 text-lg">{student.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Address</h3>
            <p className="mt-1 text-lg">{student.address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">GPA</h3>
            <p className="mt-1 text-lg">{student.gpa}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
