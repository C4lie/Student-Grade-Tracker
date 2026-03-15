import React from 'react';
import { Trash2, Edit } from 'lucide-react';

export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="card" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: '1rem'
    }}>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-dark)' }}>
          {student.name}
        </h3>
        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          <strong>Subject:</strong> {student.subject} &bull; 
          <strong style={{ marginLeft: '0.5rem' }}>Marks:</strong> {student.marksObtained} / {student.totalMarks} &bull;
          {student.grade && <><strong style={{ marginLeft: '0.5rem' }}>Grade:</strong> {student.grade} &bull;</>} 
          <strong style={{ marginLeft: '0.5rem' }}>Semester:</strong> {student.semester}
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onEdit(student)}
          style={{
            background: 'transparent',
            border: '1px solid #d1d5db',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: 'var(--text-dark)'
          }}
          title="Edit"
        >
          <Edit size={18} />
        </button>
        <button 
          onClick={() => onDelete(student.id)}
          style={{
            background: 'transparent',
            border: '1px solid #ef4444',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: '#ef4444'
          }}
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
