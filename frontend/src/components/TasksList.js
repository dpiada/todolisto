import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Task from './Task';
import TaskUpdater from './TaskUpdater'; 
import TaskDetails from './TaskDetails';

const TaskList = ({ tasks, loading, error, onTaskReload }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

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
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            action
            onClick={() => handleShowModal(task)} // Show modal on item click
          >
            <Task item={task} />
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedTask && (
        <TaskUpdater
        show={showModal}
        handleClose={handleCloseModal}
        item={selectedTask}
        onTaskReload={onTaskReload}
        />
      )}
    </div>
  );
};

export default TaskList;
