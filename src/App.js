import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({
    name: '',
    gender: '',
    minor: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    gender: false,
    minor: false,
  });

  const handleData = (event) => {
    const { id, value, type, name, checked } = event.target;
    if (type === 'checkbox') {
      setData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      name: !data.name,
      gender: !data.gender,
      minor: !data.minor,
    };
    setErrors(newErrors);

    const isFormValid = !Object.values(newErrors).includes(true);
    if (isFormValid) {
      // Form is valid, handle form submission (e.g., send data to API)
      // axios.post('https://dummyjson.com/posts', data)
      //   .then((res) => console.log(res.json()))
      console.log("Form submitted:", data);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleData}
            id='name'
            placeholder='Enter Name'
            value={data.name}
            style={{ borderColor: errors.name ? 'red' : '' }}
          />
          {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
        </div>
        <div>
          <label>
            Gender:
            <select id='gender' value={data.gender} onChange={handleData}>
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>
          {errors.gender && <span style={{ color: 'red' }}>Gender is required</span>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="minor"
              checked={data.minor}
              onChange={handleData}
            />
            Minor
          </label>
          {errors.minor && <span style={{ color: 'red' }}>Minor is required</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
