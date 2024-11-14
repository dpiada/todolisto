import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Task from './Task';  // Assuming Task component is correctly implemented

const TaskList = ({ tasks, loading, error }) => {
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (tasks.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <div>
      <h3>Task List</h3>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} action>
            <Task item={task} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
