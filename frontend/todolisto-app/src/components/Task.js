import React, { useState } from 'react';

const Checkbox = ({ checked, onChange }) => {
    return <input type="checkbox" checked={checked} onChange={onChange} />;
  };

// Item Component to display each individual item
const Task = ({ item, onStatusChange }) => {

    const handleCheckboxChange = () => {
        onStatusChange(item.id, !item.status);
        };

    return (
        <div style={styles.itemContainer}>
            <table>
                <tbody>
                <tr>
                    <td>
                    {/* Pass the current status and handle change */}
                    <Checkbox checked={item.status === 'Completed'} onChange={handleCheckboxChange} />
                    </td>
                    <td><strong>Title: </strong>{item.title}</td>
                    <td><strong>Date: </strong>{new Date(item.date).toLocaleDateString()}</td>
                    <td><strong>Priority: </strong>{item.priority}</td>
                </tr>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Task;


// Simple styles
const styles = {
  itemContainer: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
  },
};

