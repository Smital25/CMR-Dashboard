import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'sales' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      const { user, token } = res.data;
      dispatch(login({ ...user, token }));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Register for CRM Dashboard</h2>
        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
