import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const baseUrl = process.env.REACT_APP_BASE_URL;

const TaskUpdater = ({ show, handleClose, item, onTaskReload }) => {
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    date: item.date,
    priority: item.priority,
    status: item.status,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle task update
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/update/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      await response.json();
      onTaskReload();
      alert('Task updated successfully!');
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  // Handle task deletion
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/task/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      await response.json();
      onTaskReload();
      alert('Task deleted successfully!');
      handleClose(); 
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details and Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>normal</option>
              <option>low</option>
              <option>high</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Is Completed?</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>true</option>
              <option>false</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Task
          </Button>

          <Button
            variant="danger"
            onClick={handleDeleteSubmit} // Corrected to onClick
            className="ml-2"
          >
            Delete Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskUpdater;
