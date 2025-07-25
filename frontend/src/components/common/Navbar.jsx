import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>CRM Dashboard</h2>
      {user && (
        <div style={styles.userSection}>
          <span style={styles.email}>{user.email}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '15px 25px',
    backgroundColor: '#007bff',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  email: {
    fontWeight: '500',
  },
  logoutBtn: {
    padding: '5px 10px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Navbar;
