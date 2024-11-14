import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskDetails = ({ show, handleClose, taskId, onTaskReload }) => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    date: '',
    priority: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && taskId) {
      const fetchTaskDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/task/${taskId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch task details');
          }

          const data = await response.json();
          setTaskDetails({
            title: data.title,
            description: data.description,
            date: data.date,
            priority: data.priority,
            status: data.status ? 'Completed' : 'Incomplete', // Adjust the status rendering
          });
          setError(null);
        } catch (error) {
          setError('Failed to load task details');
        } finally {
          setLoading(false);
        }
      };

      fetchTaskDetails();
    }
  }, [show, taskId]);

  if (loading) {
    return <div>Loading task details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control value={taskDetails.title} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control value={taskDetails.description} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control value={taskDetails.date} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control value={taskDetails.priority} readOnly />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control value={taskDetails.status} readOnly />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetails;
