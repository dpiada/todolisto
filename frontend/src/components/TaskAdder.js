import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const TaskAdder = ({ show, handleClose, onTaskReload }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: (new Date().toISOString()).slice(0, 10),
    priority: "normal",
    status: false,
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      await response.json();

      onTaskReload();

      setFormData({
        title: "",
        description: "",
        date: (new Date().toISOString()).slice(0, 10),
        priority: "normal",
        status: false,
      });

      handleClose(); 
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Adder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="priority">
            <Form.Label>Priority:</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Check
              type="checkbox"
              label="Completed"
              name="status"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskAdder;
