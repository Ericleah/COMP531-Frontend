import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions'; // Assuming you've stored it in an 'actions' folder
import profilePic from '../../assets/profile.png';
import riceIcon from '../../assets/rice-university-logo.png';


// Styled Components for the buttons
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

const Login = () => {
  //const { login: handleLogin } = useContext(AuthContext); // Renamed for clarity
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${username}`
    );
    const users = await response.json();
    const user = users[0];

    if (user && user.address.street === password) {
      if (user) {
        // Transform the user object
        //user.name=user.username;
        user.zipcode=user.address.zipcode;
        user.password = user.address.street;
        delete user.address;
      }
      dispatch(login({
        id: user.id,
        username: username,
        password: user.password,
        zipcode: user.zipcode,
        email: user.email,
        phone: user.phone,
        profilePic: profilePic,
        // ... other attributes
      }));
      navigate("/"); // Removed the duplicate navigate call
    } else {
      alert("Incorrect username or password");
    }
  };

  return (
    <div className="login-container">
      <Card>
        <div className="header">
          <img src={riceIcon} alt="Rice University" className="university-logo" />
          <h1>Ricebook</h1>
        </div>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        <Link to="/register">Need an account? Register here</Link>
      </Card>
    </div>
  );
};

export default Login;