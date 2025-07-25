import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../api/api';
import { useSelector } from 'react-redux';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  // 🔄 Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await getTasks(user?.token);
      setTasks(res.data);
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to load tasks');
    }
  };

  // ▶️ On page load or when token changes
 useEffect(() => {
  if (!user?.token) return;

  const fetchData = async () => {
    try {
      const res = await getTasks(user.token);
      setTasks(res.data);
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to load tasks');
    }
  };

  fetchData();
}, [user?.token]); // ✅ No warning anymore


  // ✍️ Handle form input
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTask(editingId, formData, user.token);
        setEditingId(null);
      } else {
        await createTask(formData, user.token);
      }
      setFormData({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      alert(error?.response?.data?.message || 'Save failed');
    }
  };

  // 📝 Populate form for editing
  const handleEdit = (task) => {
    setEditingId(task._id);
    setFormData({ title: task.title, description: task.description });
  };

  // ❌ Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id, user.token);
      fetchTasks();
    } catch (error) {
      alert(error?.response?.data?.message || 'Delete failed');
    }
  };

  // 🔁 Update task status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus }, user.token);
      fetchTasks();
    } catch (error) {
      alert(error?.response?.data?.message || 'Status update failed');
    }
  };

  return (
    <Layout>
      <h2>📝 Tasks</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">{editingId ? 'Update' : 'Add Task'}</button>
      </form>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4">No tasks found</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleEdit(task)}>✏️ Edit</button>{' '}
                  <button onClick={() => handleDelete(task._id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Tasks;
