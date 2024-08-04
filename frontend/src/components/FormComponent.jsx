import React, { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    option1: "",
    option2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2>React Form with Bootstrap</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="option1" className="form-label">
            Select Option 1
          </label>
          <select
            id="option1"
            name="option1"
            className="form-select"
            value={formData.option1}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="option1a">Option 1A</option>
            <option value="option1b">Option 1B</option>
            <option value="option1c">Option 1C</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="option2" className="form-label">
            Select Option 2
          </label>
          <select
            id="option2"
            name="option2"
            className="form-select"
            value={formData.option2}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="option2a">Option 2A</option>
            <option value="option2b">Option 2B</option>
            <option value="option2c">Option 2C</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
