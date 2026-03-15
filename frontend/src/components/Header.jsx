import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { logoutUser, getCurrentUser } from '../utils/storageHelper';

export default function Header() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/auth');
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem',
      backgroundColor: 'var(--card-bg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <BookOpen color="var(--primary-color)" size={32} />
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Student Grade Tracker</h1>
      </div>
      
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: 'var(--text-light)' }}>Welcome, <strong>{user.name}</strong></span>
          <button onClick={handleLogout} className="btn">Logout</button>
        </div>
      )}
    </header>
  );
}
