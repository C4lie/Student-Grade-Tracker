import React, { useState, useEffect } from 'react';

export default function AddStudentModal({ isOpen, onClose, onSave, studentToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    marksObtained: '',
    totalMarks: '',
    grade: '',
    semester: ''
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name,
        subject: studentToEdit.subject,
        marksObtained: studentToEdit.marksObtained || '',
        totalMarks: studentToEdit.totalMarks || '',
        grade: studentToEdit.grade || '',
        semester: studentToEdit.semester
      });
    } else {
      setFormData({ name: '', subject: '', marksObtained: '', totalMarks: '', grade: '', semester: '' });
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || formData.marksObtained === '' || formData.totalMarks === '' || !formData.semester) {
      alert("Please fill in all required fields (excluding Grade)");
      return;
    }
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          {studentToEdit ? 'Edit Student' : 'Add New Student'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Student Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Subject</label>
            <input 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              placeholder="e.g. Mathematics"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Marks Obtained</label>
              <input 
                name="marksObtained" 
                type="number"
                value={formData.marksObtained} 
                onChange={handleChange} 
                placeholder="e.g. 85"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Marks</label>
              <input 
                name="totalMarks" 
                type="number"
                value={formData.totalMarks} 
                onChange={handleChange} 
                placeholder="e.g. 100"
                required
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Grade (Optional)</label>
            <input 
              name="grade" 
              value={formData.grade} 
              onChange={handleChange} 
              placeholder="e.g. A, B+"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Semester</label>
            <input 
              name="semester" 
              value={formData.semester} 
              onChange={handleChange} 
              placeholder="e.g. Fall 2026"
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #d1d5db',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
