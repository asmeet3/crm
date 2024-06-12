import React, { useState } from 'react';
import axios from 'axios';
import './ManageAudience.css';

const criteriaOptions = [
  { id: 1, label: 'Customers with total spends > INR 10000' },
  { id: 2, label: 'Customers with total spends > INR 10000 AND max number of visits are 3' },
  { id: 3, label: 'Customers not visited in last 3 months' },
];

const ManageAudience = () => {
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [operator, setOperator] = useState('NONE');
  const [audienceSize, setAudienceSize] = useState(null);
  const [audienceList, setAudienceList] = useState([]);

  const handleCriteriaChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (operator === 'NONE') {
      setSelectedCriteria((prev) => 
        prev.includes(value) ? [] : [value]
      );
    } else {
      setSelectedCriteria((prev) =>
        e.target.checked ? [...prev, value] : prev.filter((id) => id !== value)
      );
    }
  };

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
    if (e.target.value === 'NONE') {
      setSelectedCriteria([]);
    }
  };

  const checkAudienceSize = () => {
    setAudienceSize(audienceList.length); // Display the number of rows in the table
  };

  const saveAudience = () => {
    // Simulate API call to save audience
    axios.post('/api/save-audience', { criteria: selectedCriteria, operator })
      .then(response => {
        alert('Audience saved successfully!');
      })
      .catch(error => {
        console.error('Error saving audience:', error);
      });
  };

  const addAudienceRow = () => {
    setAudienceList([...audienceList, { name: '', phone: '', email: '', phoneValid: true }]);
  };

  const deleteAudienceRow = (index) => {
    setAudienceList(audienceList.filter((_, i) => i !== index));
  };

  const handleAudienceChange = (index, field, value) => {
    const updatedList = [...audienceList];
    if (field === 'phone') {
      updatedList[index].phoneValid = /^\d{10}$/.test(value); // Validate phone number
    }
    updatedList[index][field] = value;
    setAudienceList(updatedList);
  };

  return (
    <div >
    <br/>
      <h3>MANAGE AUDIENCE</h3>
      <div>
        <br/>
        <h5>CATEGORY</h5>
        {criteriaOptions.map((criteria) => (
          <div key={criteria.id}>
            <input
              type="checkbox"
              id={`criteria-${criteria.id}`}
              value={criteria.id}
              onChange={handleCriteriaChange}
              checked={selectedCriteria.includes(criteria.id)}
              disabled={operator === 'NONE' && selectedCriteria.length > 0 && !selectedCriteria.includes(criteria.id)}
            />
            <label htmlFor={`criteria-${criteria.id}`}>{criteria.label}</label>
          </div>
        ))}
      </div>
      <div>
        <br/>
        <h5>MULTIPLE CATEGORIES</h5>
        <label>
          <input
            type="radio"
            value="NONE"
            checked={operator === 'NONE'}
            onChange={handleOperatorChange}
          />
          No
        </label>
        <label>
          <input
            type="radio"
            value="AND"
            checked={operator === 'AND'}
            onChange={handleOperatorChange}
          />
          AND
        </label>
        <label>
          <input
            type="radio"
            value="OR"
            checked={operator === 'OR'}
            onChange={handleOperatorChange}
          />
          OR
        </label>
      </div>
      <div>
        <br/>
        <button className="button1" onClick={checkAudienceSize}>Check Audience Size</button>
        {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
      </div>
      <div>
        <button className="button1" onClick={saveAudience}>Save Audience</button>
      </div>
      <div>
        <br/><br/>
        <h5>AUDIENCE LIST</h5>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {audienceList.map((audience, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={audience.name}
                    onChange={(e) => handleAudienceChange(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={audience.phone}
                    onChange={(e) => handleAudienceChange(index, 'phone', e.target.value)}
                    className={!audience.phoneValid ? 'invalid' : ''}
                  />
                  {!audience.phoneValid && <span className="invalid-number">Invalid phone number</span>}
                </td>
                <td>
                  <input
                    type="email"
                    value={audience.email}
                    onChange={(e) => handleAudienceChange(index, 'email', e.target.value)}
                  />
                </td>
                <td>
                  <button className="delete-button" onClick={() => deleteAudienceRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-button" onClick={addAudienceRow}>+</button>
      </div>
    </div>
  );
};

export default ManageAudience;
