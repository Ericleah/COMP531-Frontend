import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registerStyle.css'; // Assume a new CSS file name

// Styled components for button styling
import styled from 'styled-components';

const ActionButton = styled.button`
  background-color: #4a6fa5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #3a5f85;
  }
`;

const FormContainer = styled.div`
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  background: white;
  width: 90%;
  max-width: 500px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    user: '',
    mail: '',
    mobile: '',
    dob: '',
    postalCode: '',
    pwd: '',
    confirmPwd: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (fieldName, value) => {
    let errorMsg = '';
    switch (fieldName) {
      case 'user':
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          errorMsg = 'Username must be alphanumeric.';
        }
        break;
      case 'mail':
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          errorMsg = 'Email is invalid.';
        }
        break;
      case 'postalCode':
        if (!/^\d{5}(-\d{4})?$/.test(value)) {
          errorMsg = 'Postal code is invalid.';
        }
        break;
      case 'pwd':
        if (value.length < 6) {
          errorMsg = 'Password must be at least 6 characters long.';
        }
        break;
      case 'confirmPwd':
        if (value !== formData.pwd) {
          errorMsg = 'Passwords do not match.';
        }
        break;
    }
    setFormErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = Object.values(formErrors).every(x => x === '');
    if (isFormValid) {
      // Submit the data
      console.log('Form data submitted:', formData);
      navigate('/home'); // Assuming '/home' is the target after registration
    } else {
      console.error('Validation errors:', formErrors);
    }
  };

  return (
    <FormContainer>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="user" value={formData.user} onChange={handleInputChange} />
        {formErrors.user && <div className="error">{formErrors.user}</div>}
        <input type="email" placeholder="Email" name="mail" value={formData.mail} onChange={handleInputChange} />
        {formErrors.mail && <div className="error">{formErrors.mail}</div>}
        <input type="text" placeholder="Phone" name="mobile" value={formData.mobile} onChange={handleInputChange} />
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
        <input type="text" placeholder="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
        {formErrors.postalCode && <div className="error">{formErrors.postalCode}</div>}
        <input type="password" placeholder="Password" name="pwd" value={formData.pwd} onChange={handleInputChange} />
        {formErrors.pwd && <div className="error">{formErrors.pwd}</div>}
        <input type="password" placeholder="Confirm Password" name="confirmPwd" value={formData.confirmPwd} onChange={handleInputChange} />
        {formErrors.confirmPwd && <div className="error">{formErrors.confirmPwd}</div>}
        <ActionButton type="submit">Register</ActionButton>
      </form>
      <Link to="/login">Already have an account? Log in</Link>
    </FormContainer>
  );
};

export default Register;