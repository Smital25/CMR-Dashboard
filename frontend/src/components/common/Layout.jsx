import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';


const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>CRM</h2>
        <NavLink to="/dashboard" style={styles.link}>Dashboard</NavLink>
        <NavLink to="/clients" style={styles.link}>Clients</NavLink>
        <NavLink to="/tasks" style={styles.link}>Tasks</NavLink>
        <NavLink to="/pipeline" style={styles.link}>Sales Pipeline</NavLink>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <span>Welcome, {user?.email}</span>
        </header>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh',
    backgroundColor: '#007bff',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  logo: {
    marginBottom: '30px',
    fontSize: '24px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '15px',
    fontSize: '16px',
  },
  logout: {
    marginTop: 'auto',
    background: 'white',
    color: '#007bff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '15px 20px',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
  },
  content: {
    padding: '20px',
    backgroundColor: '#fdfdfd',
    height: '100vh',
    overflowY: 'auto',
  },
};

export default Layout;
