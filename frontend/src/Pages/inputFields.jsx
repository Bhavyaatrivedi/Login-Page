import React, { useState } from 'react';
import axios from 'axios';

const InputFields = () => {
  const [fields, setFields] = useState([{ name: '', value: '' }]);

  const handleAddItem = async () => {
    try {
      const invalidFields = fields.some(field => !field.name || !field.value);
      if (invalidFields) {
        alert('All name and value fields are required.');
        return;
      }

      const response = await axios.post('http://localhost:4000/add-field', { fields });

      console.log('New items:', response.data.items);

      setFields([{ name: '', value: '' }]);

      // Alert message for successful form submission
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleAddField = (index) => {
    const newFields = [...fields];
    newFields.splice(index + 1, 0, { name: '', value: '' });
    setFields(newFields);
  };



  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Name"
            value={field.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleInputChange(index, 'value', e.target.value)}
          />
          <button style={{ marginLeft: '5px' }} onClick={() => handleAddField(index)}>+</button>
          <button style={{ marginLeft: '5px' }} onClick={() => handleDeleteField(index)}>-</button>
        </div>
      ))}
      <button style={{ marginLeft: '5px' }} onClick={handleAddItem}>Submit Form</button>
    </div>
  );
};

export default InputFields;
