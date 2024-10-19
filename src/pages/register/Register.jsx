import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register as registerAction } from "../../actions/authActions"; // Assuming you've stored it in an 'actions' folder
import profilePic from "../../assets/profile.png";
import styled from "styled-components";
import "./register.scss";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4a6fa5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #365880;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    birthDate: '',
    zipcode: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  const setError = (field, message) => {
    setErrors(prevErrors => ({ ...prevErrors, [field]: message }));
  };

  const validateForm = () => {
    let valid = true;
    const { username, email, phone, birthDate, zipcode, password, confirmPassword } = formData;

    // Username validation
    if (!username.trim()) {
      setError('username', 'Username is required');
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('username', 'Username can only contain letters, numbers, and underscores');
      valid = false;
    } else {
      setError('username', '');
    }

    // Email validation
    if (!email) {
      setError('email', 'Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('email', 'Email address is invalid');
      valid = false;
    } else {
      setError('email', '');
    }

    // Phone validation
    if (phone && !/^\d{10}$/.test(phone.replace(/[\s-()]/g, ''))) {
      setError('phone', 'Phone number must be 10 digits');
      valid = false;
    } else {
      setError('phone', '');
    }

    // Birthdate validation
    if (birthDate && new Date(birthDate) >= new Date()) {
      setError('birthDate', 'Birth date must be in the past');
      valid = false;
    } else {
      setError('birthDate', '');
    }

    // Zipcode validation
    if (zipcode && !/^\d{5}(-\d{4})?$/.test(zipcode)) {
      setError('zipcode', 'Zip code is invalid');
      valid = false;
    } else {
      setError('zipcode', '');
    }

    // Password validation
    if (!password) {
      setError('password', 'Password is required');
      valid = false;
    } else if (password.length < 6) {
      setError('password', 'Password must be at least 6 characters');
      valid = false;
    } else {
      setError('password', '');
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('confirmPassword', 'Passwords do not match');
      valid = false;
    } else {
      setError('confirmPassword', '');
    }

    return valid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    dispatch(registerAction({...formData, profilePic})); // Pass all formData to the action
    navigate("/");
  };

  return (
    <div className="register-container">
      <Card>
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <Input type="date" name="birthDate" placeholder="Birth Date" value={formData.birthDate} onChange={handleChange} />
          <Input type="text" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <Button type="submit">Register</Button>
        </form>
        <Link to="/login">Already have an account? Log in</Link>
      </Card>
    </div>
  );
};

export default Register;
