import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks/stats', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Stats Fetch Error:', err);
        alert('Could not load dashboard stats');
      }
    };

    if (user?.token) {
      fetchStats();
    }
  }, [user]);

  const chartData = stats
    ? [
        { name: 'Pending', value: stats.pending || 0 },
        { name: 'In Progress', value: stats['in-progress'] || 0 },
        { name: 'Completed', value: stats.completed || 0 },
      ]
    : [];

  const totalTasks =
    (stats?.pending || 0) +
    (stats?.['in-progress'] || 0) +
    (stats?.completed || 0);

  return (
    <Layout>
      <h2 style={{ marginBottom: '20px' }}>📊 Task Dashboard</h2>

      {/* Summary Cards */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          flexWrap: 'wrap',
        }}
      >
        <div style={cardStyle('#ffcc00')}>
          <h3>Pending</h3>
          <p>{stats?.pending ?? 0}</p>
        </div>
        <div style={cardStyle('#00c4a1')}>
          <h3>In Progress</h3>
          <p>{stats?.['in-progress'] ?? 0}</p>
        </div>
        <div style={cardStyle('#4caf50')}>
          <h3>Completed</h3>
          <p>{stats?.completed ?? 0}</p>
        </div>
        <div style={cardStyle('#607d8b')}>
          <h3>Total</h3>
          <p>{totalTasks}</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

// 💅 Simple card style function
const cardStyle = (bg) => ({
  background: bg,
  color: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '160px',
  textAlign: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
});

export default Dashboard;
