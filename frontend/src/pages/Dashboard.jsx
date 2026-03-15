import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import StudentCard from '../components/StudentCard';
import AddStudentModal from '../components/AddStudentModal';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../utils/storageHelper';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const handleSaveStudent = (data) => {
    if (studentToEdit) {
      updateStudent(studentToEdit.id, data);
    } else {
      addStudent(data);
    }
    setStudents(getStudents());
    setIsModalOpen(false);
    setStudentToEdit(null);
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
      setStudents(getStudents());
    }
  };

  const stats = useMemo(() => {
    const total = students.length;
    const subjects = new Set(students.map(s => s.subject.toLowerCase())).size;
    
    // Attempt to compute an average percentage based on marks
    let totalMarksObtained = 0;
    let totalMarksPossible = 0;
    
    students.forEach(s => {
      const obtained = parseFloat(s.marksObtained);
      const total = parseFloat(s.totalMarks);
      if (!isNaN(obtained) && !isNaN(total) && total > 0) {
        totalMarksObtained += obtained;
        totalMarksPossible += total;
      }
    });

    let avg = 'N/A';
    if (totalMarksPossible > 0) {
      avg = ((totalMarksObtained / totalMarksPossible) * 100).toFixed(1) + '%';
    } else if (total > 0) {
      avg = '-'; 
    }

    return { total, subjects, avg };
  }, [students]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header />
      
      <main className="container">
        {/* Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Total Students</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.total}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Subjects Count</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.subjects}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Average Marks</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.avg}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Student List</h2>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setStudentToEdit(null);
              setIsModalOpen(true);
            }}
          >
            Add New Student
          </button>
        </div>

        {students.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-light)' }}>
            <p>No students yet. Click Add New Student to get started.</p>
          </div>
        ) : (
          <div>
            {students.map(student => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />
    </div>
  );
}
