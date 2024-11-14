import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from './components/TasksList';
import TaskAdder from './components/TaskAdder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      loading: false,
      error: null,
    };
  }

  // Fetch tasks from the server
  fetchTasks = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:8080/tasks/');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      this.setState({ tasks: data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // Call fetchTasks when the component mounts
  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    const { tasks, loading, error } = this.state;

    return (
      <Container fluid="md" className="min-vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} lg={4} className="mb-4">
            <TaskAdder onTaskAdded={this.fetchTasks} />
          </Col>
          <Col xs={12} lg={4} className="mb-4">
            <TaskList tasks={tasks} loading={loading} error={error} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
