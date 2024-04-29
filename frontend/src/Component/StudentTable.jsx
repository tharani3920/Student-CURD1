import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { MdModeEdit , MdDelete } from "react-icons/md";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    standard: '',
    subject: '',
    mark: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditedData({
      name: student.name,
      email: student.email,
      standard: student.standard,
      subject: student.subject,
      mark: student.mark
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/students/${editingStudent._id}`, editedData);
      console.log('first', editingStudent);
      setEditingStudent(null);
      setEditedData({  // Clear the edited data after submission
        name: '',
        email: '',
        standard: '',
        subject: '',
        mark: ''
      });
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container">
      <h2>Student Records</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Standard</th>
            <th>Subject</th>
            <th>Mark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.standard}</td>
              <td>{student.subject}</td>
              <td>{student.mark}</td>
              <td>
                <span
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEdit(student)}
                >
                  <MdModeEdit />
                </span>
                <span
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => deleteStudent(student._id)}
                >
                  <MdDelete />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingStudent && (
        <div className="editing-form">
          <h3>Edit Student</h3>
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="standard"
            value={editedData.standard}
            onChange={handleInputChange}
            placeholder="Standard"
          />
          <input
            type="text"
            name="subject"
            value={editedData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
          />
          <input
            type="text"
            name="mark"
            value={editedData.mark}
            onChange={handleInputChange}
            placeholder="Mark"
          />
          <button onClick={handleSubmit}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
