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
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', value: '' }]);
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
        </div>
      ))}
      <button style={{ marginLeft: '5px' }} onClick={handleAddField}>+</button>
      <button style={{ marginLeft: '5px' }} onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default InputFields;
