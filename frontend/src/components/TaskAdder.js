import React, { useState } from 'react';

const TaskAdder = ({ onTaskReload }) => {
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

      const data = await response.json();

      onTaskReload();

      alert(`Task added successfully! ID: ${data}`);

      setFormData({
        title: "",
        description: "",
        date: (new Date().toISOString()).slice(0, 10),
        priority: "normal",
        status: false,
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="task-adder-container">
      <form onSubmit={handleSubmit} className="task-adder-form">
        <h3>Task Adder</h3>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-control"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default TaskAdder;
