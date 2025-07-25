import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from '../api/api';
import { useSelector } from 'react-redux';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [editingId, setEditingId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  // Fetch clients from backend
  const fetchClients = async () => {
    try {
      const res = await getClients(user.token);
      setClients(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch clients');
    }
  };

  // On page load
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getClients(user.token);
      setClients(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch clients');
    }
  };

  fetchData();
}, [user.token]);


  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateClient(editingId, formData, user.token);
        setEditingId(null);
      } else {
        await createClient(formData, user.token);
      }
      setFormData({ name: '', email: '', company: '' });
      fetchClients();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving client');
    }
  };

  // Edit button
  const handleEdit = (client) => {
    setEditingId(client._id);
    setFormData({
      name: client.name,
      email: client.email,
      company: client.company,
    });
  };

  // Delete button
  const handleDelete = async (id) => {
    try {
      await deleteClient(id, user.token);
      fetchClients();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <Layout>
      <h2>👥 Clients</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr><td colSpan="4">No clients found</td></tr>
          ) : (
            clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.company}</td>
                <td>
                  <button onClick={() => handleEdit(client)}>✏️ Edit</button>{' '}
                  <button onClick={() => handleDelete(client._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Clients;
