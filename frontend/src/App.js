import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from './components/TasksList';
import TaskAdder from './components/TaskAdder';
import { Button, Form } from 'react-bootstrap';

const baseUrl = process.env.REACT_APP_BASE_URL;

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
      showAdder: false,
    };
  }

  fetchTasks = async () => {
    this.setState({ loading: true, error: null });
    try {
      const {
        filterDate,
        filterPriority,
        filterStatus,
        orderBy,
        ascending,
      } = this.state;

      // Construct query parameters
      const queryParams = new URLSearchParams();

      if (filterDate) {
        queryParams.append('date', filterDate);
      }
      if (filterPriority) {
        queryParams.append('priority', filterPriority);
      }
      if (filterStatus) {
        queryParams.append('status', filterStatus);
      }
      if (orderBy) {
        queryParams.append('orderBy', orderBy);
      }
      if (ascending !== undefined) {
        queryParams.append('ascending', ascending);
      }

      const url = `${baseUrl}/tasks/?${queryParams.toString()}`;

      const response = await fetch(url);
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

  handleFilterChange = () => {
    this.setState({}, () => this.fetchTasks());
  };

  componentDidMount() {
    this.fetchTasks();
  }

  handleShowAdder = () => {
    this.setState({ showAdder: true });
  };

  handleCloseModal = () => {
    this.setState({ showAdder: false });
  };

  render() {
    const { tasks, loading, error, filterDate, filterPriority, filterStatus, orderBy, ascending, showAdder } = this.state;
    const uniqueDates = [...new Set(tasks.map((task) => task.date))];

    return (
      <Container>
        <Row style={styles.filterBar}>
          <Col>
            <Form>
              <Form.Group controlId="formFilterDate">
                <Form.Control
                  as="select"
                  value={filterDate}
                  onChange={(e) =>
                    this.setState({ filterDate: e.target.value }, this.handleFilterChange)
                  }
                >
                  <option value="">All Dates</option>
                  {uniqueDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="formFilterPriority">
                <Form.Control
                  as="select"
                  value={filterPriority}
                  onChange={(e) =>
                    this.setState({ filterPriority: e.target.value }, this.handleFilterChange)
                  }
                >
                  <option value="">All Priorities</option>
                  <option value="low">low</option>
                  <option value="normal">normal</option>
                  <option value="high">high</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="formFilterStatus">
                <Form.Control
                  as="select"
                  value={filterStatus}
                  onChange={(e) =>
                    this.setState({ filterStatus: e.target.value }, this.handleFilterChange)
                  }
                >
                  <option value="">All Statuses</option>
                  <option value="false">To Do</option>
                  <option value="true">Completed</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="formOrderBy">
                <Form.Control
                  as="select"
                  value={orderBy}
                  onChange={(e) =>
                    this.setState({ orderBy: e.target.value }, this.handleFilterChange)
                  }
                >
                  <option value="date">Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
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
        </Row>
        <Row style={styles.listTaskPanel}>
          <Button onClick={this.handleShowAdder}>Add Task</Button>
          <div style={styles.listTaskPanel}>
            <TaskList tasks={tasks} loading={loading} error={error} onTaskReload={this.fetchTasks} />
          </div>
        </Row>

        {/* Task Adder Modal */}
        <TaskAdder
          show={showAdder}
          handleClose={this.handleCloseModal}
          onTaskReload={this.fetchTasks}
        />
      </Container>
    );
  }
}

export default App;

const styles = {
  filterBar: {
    border: '1px solid #595F72',
    borderRadius: '15px',
    padding: '5px',
    marginTop: '50px',
  },
  listTaskPanel: {
    border: '1px solid #595F72',
    borderRadius: '15px',
    padding: '15px',
    marginTop: '8px',
  },
};
