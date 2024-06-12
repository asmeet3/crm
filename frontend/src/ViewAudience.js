import React, { useState } from 'react';
import './ViewAudience.css';

const criteriaOptions = [
    { id: 1, label: 'Customers with total spends > INR 10000' },
    { id: 2, label: 'Customers with total spends > INR 10000 AND max number of visits are 3' },
    { id: 3, label: 'Customers not visited in last 3 months' },
];

const ViewAudience = () => {

    const [selectedCriteria, setSelectedCriteria] = useState([]);
    const [operator, setOperator] = useState('NONE');
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

  return (
    <div>
        <br/>
        
        <h3>AUDIENCE LIST</h3>
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
            ))}<div>
                <br />
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    </div>
  );
};

export default ViewAudience;
