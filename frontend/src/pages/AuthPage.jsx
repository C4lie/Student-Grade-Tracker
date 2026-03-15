import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, createUser } from '../utils/storageHelper';
import { BookOpen } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert("Please enter email and password");
        return;
      }
      const user = loginUser(formData.email, formData.password);
      if (user) {
        navigate('/');
      } else {
        alert("Invalid email or password");
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }
      createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      // Automatically log them in after sign up
      loginUser(formData.email, formData.password);
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <BookOpen color="var(--primary-color)" size={48} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Student Grade Tracker</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <button 
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: isLogin ? '2px solid var(--primary-color)' : 'none',
              fontWeight: isLogin ? 600 : 400,
              color: isLogin ? 'var(--primary-color)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: !isLogin ? '2px solid var(--primary-color)' : 'none',
              fontWeight: !isLogin ? 600 : 400,
              color: !isLogin ? 'var(--primary-color)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="John Doe" 
              />
            </div>
          )}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
            <input 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="john@example.com" 
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
