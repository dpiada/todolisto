import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from './components/TasksList';
import TaskAdder from './components/TaskAdder';
import { Form } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      loading: false,
      error: null,
      filterDate: '',
      filterPriority: '',
      filterStatus: '',
      orderBy: 'date',
      ascending: true,
    };
  }

  // Fetch all tasks from the server without filters
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

  // Filter and sort tasks based on the selected criteria
  getFilteredAndSortedTasks = () => {
    const { tasks, filterDate, filterPriority, filterStatus, orderBy, ascending } = this.state;

    // Filter tasks
    let filteredTasks = tasks;
    if (filterDate) {
      filteredTasks = filteredTasks.filter(task => task.date === filterDate);
    }
    if (filterPriority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }
    if (filterStatus) {
      filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
    }

    // Sort tasks
    filteredTasks = filteredTasks.sort((a, b) => {
      const fieldA = a[orderBy];
      const fieldB = b[orderBy];

      if (fieldA < fieldB) return ascending ? -1 : 1;
      if (fieldA > fieldB) return ascending ? 1 : -1;
      return 0;
    });

    return filteredTasks;
  };

  // Handle filter and sort change
  handleFilterChange = () => {
    this.setState({}, () => this.forceUpdate()); // Trigger re-render after filter change
  };

  // Call fetchTasks when component mounts
  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    const { loading, error, filterDate, filterPriority, filterStatus, orderBy, ascending } = this.state;

    const tasks = this.getFilteredAndSortedTasks();
	const uniqueDates = [...new Set(tasks.map(task => task.date))];


    return (
      <Container fluid="md" className="min-vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} lg={4} className="mb-4">
            <TaskAdder onTaskReload={this.fetchTasks} />
          </Col>

          <Col xs={12} lg={4} className="mb-4">
		  	<h3>Filters</h3>
            <Form>
              <Form.Group controlId="formFilterDate">
                <Form.Label>Filter by Date</Form.Label>
                <Form.Control
                  as="select"
                  value={filterDate}
                  onChange={(e) => this.setState({ filterDate: e.target.value }, this.handleFilterChange)}
                >
                  <option value="">All Dates</option>
				  {uniqueDates.map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formFilterPriority">
                <Form.Label>Filter by Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={filterPriority}
                  onChange={(e) => this.setState({ filterPriority: e.target.value }, this.handleFilterChange)}
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="normal">normal</option>
                  <option value="high">high</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formFilterStatus">
                <Form.Label>Filter by Status</Form.Label>
                <Form.Control
                  as="select"
                  value={filterStatus}
                  onChange={(e) => this.setState({ filterStatus: e.target.value }, this.handleFilterChange)}
                >
                  <option value="">All Statuses</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formOrderBy">
                <Form.Label>Order by</Form.Label>
                <Form.Control
                  as="select"
                  value={orderBy}
                  onChange={(e) => this.setState({ orderBy: e.target.value }, this.handleFilterChange)}
                >
                  <option value="date">Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAscending">
                <Form.Check
                  type="checkbox"
                  label="Ascending Order"
                  checked={ascending}
                  onChange={() => this.setState({ ascending: !ascending }, this.handleFilterChange)}
                />
              </Form.Group>
            </Form>
          </Col>

          <Col xs={12} lg={4} className="mb-4">
            <TaskList tasks={tasks} loading={loading} error={error} onTaskReload={this.fetchTasks} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
