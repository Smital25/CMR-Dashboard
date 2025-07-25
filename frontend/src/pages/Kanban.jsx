import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks, updateTask } from '../api/api';
import { useSelector } from 'react-redux';

const statusOrder = ['pending', 'in-progress', 'completed'];

const Kanban = () => {
  const [columns, setColumns] = useState({
    pending: [],
    'in-progress': [],
    completed: [],
  });

  const user = useSelector((state) => state.auth.user);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(user.token);
      const grouped = {
        pending: [],
        'in-progress': [],
        completed: [],
      };

      res.data.forEach((task) => {
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        }
      });

      setColumns(grouped);
    } catch (err) {
      console.error('Fetch Error:', err);
      alert(err?.response?.data?.message || err.message || 'Failed to load tasks');
    }
  };

  // ✅ useEffect with correct dependency: `user`
 useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await getTasks(user.token);
      const grouped = {
        pending: [],
        'in-progress': [],
        completed: [],
      };

      res.data.forEach((task) => {
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        }
      });

      setColumns(grouped);
    } catch (err) {
      console.error('Fetch Error:', err);
      alert(err?.response?.data?.message || err.message || 'Failed to load tasks');
    }
  };

  if (user?.token) {
    fetchTasks();
  }
}, [user]);


  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const sourceList = columns[source.droppableId] || [];
    const movedTask = sourceList.find((task) => task._id === draggableId);

    if (!movedTask) {
      console.warn('Task not found:', draggableId);
      return;
    }

    try {
      await updateTask(draggableId, { status: destination.droppableId }, user.token);
      fetchTasks();
    } catch (err) {
      console.error('Update Error:', err);
      alert(err?.response?.data?.message || err.message || 'Failed to update task status');
    }
  };

  return (
    <Layout>
      <h2>📋 Kanban Task Board</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {statusOrder.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    flex: 1,
                    backgroundColor: '#f4f4f4',
                    padding: '15px',
                    borderRadius: '10px',
                    minHeight: '300px',
                  }}
                >
                  <h3 style={{ textTransform: 'capitalize' }}>{status}</h3>
                  {columns[status]?.map((task, index) => (
                    <Draggable draggableId={task._id} index={index} key={task._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '12px',
                            margin: '8px 0',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <strong>{task.title}</strong>
                          <p style={{ marginTop: '6px', fontSize: '13px', color: '#444' }}>
                            {task.description}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default Kanban;
