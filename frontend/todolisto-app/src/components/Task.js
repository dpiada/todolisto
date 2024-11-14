import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Badge from 'react-bootstrap/Badge';

const Task = ({ item }) => {

    const level = {
        'low':'success',
        'normal':'primary',
        'high':'danger'
    }

    return (
        <Container>
            <Row>
                <Col><Badge bg={level[item.priority]}>{item.priority}</Badge></Col>
                <Col>{item.title}</Col>
                <Col>{item.date}</Col>
                <Col>{ item.status ? <strong>Completed</strong> : <strong>Incomplete</strong>} </Col>
            </Row>
        </Container>
    );
};

export default Task;
