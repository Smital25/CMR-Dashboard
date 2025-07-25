import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const stages = ['Lead', 'Contacted', 'Proposal Sent', 'Won', 'Lost'];
const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

const SalesPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [form, setForm] = useState({
    name: '',
    stage: 'Lead',
    value: '',
    contact: ''
  });
  const [editingId, setEditingId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const fetchDeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/deals', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setDeals(res.data);
    } catch {
      alert('Error fetching deals');
    }
  };

  useEffect(() => {
  const fetchDeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/deals', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setDeals(res.data);
    } catch {
      alert('Error fetching deals');
    }
  };

  if (user?.token) {
    fetchDeals();
  }
}, [user?.token]); // ✅ clean, no lint warning

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/deals/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        await axios.post('http://localhost:5000/api/deals', form, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      setForm({ name: '', stage: 'Lead', value: '', contact: '' });
      setEditingId(null);
      fetchDeals();
    } catch {
      alert('Error saving deal');
    }
  };

  const handleEdit = (deal) => {
    setForm(deal);
    setEditingId(deal._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deals/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchDeals();
    } catch {
      alert('Delete failed');
    }
  };

  // 📊 Pie Chart Data
  const stageCounts = useMemo(() => {
    return stages.map((stage) => ({
      name: stage,
      value: deals.filter((deal) => deal.stage === stage).length,
    }));
  }, [deals]);

  return (
    <Layout>
      <h2>📈 Sales Pipeline</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Deal Name" required />
        <input name="value" value={form.value} onChange={handleChange} placeholder="Deal Value ₹" required />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Client Contact" required />
        <select name="stage" value={form.stage} onChange={handleChange}>
          {stages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <table border="1" cellPadding="8" width="100%" style={{ marginBottom: '40px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Contact</th>
            <th>Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.length === 0 ? (
            <tr><td colSpan="5">No deals yet</td></tr>
          ) : (
            deals.map((deal) => (
              <tr key={deal._id}>
                <td>{deal.name}</td>
                <td>₹{deal.value}</td>
                <td>{deal.contact}</td>
                <td>{deal.stage}</td>
                <td>
                  <button onClick={() => handleEdit(deal)}>✏️</button>
                  <button onClick={() => handleDelete(deal._id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3>📊 Stage Distribution</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart width={400} height={300}>
          <Pie
            data={stageCounts}
            cx={200}
            cy={150}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {stageCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </Layout>
  );
};

export default SalesPipeline;
