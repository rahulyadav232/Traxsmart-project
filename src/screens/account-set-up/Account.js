import React, { useState } from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [userRegistration, setUserRegistration] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateUsername = (value) => {
    if (value.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (value !== userRegistration.password) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    newErrors.username = validateUsername(userRegistration.username);
    newErrors.password = validatePassword(userRegistration.password);
    newErrors.confirmPassword = validateConfirmPassword(
      userRegistration.confirmPassword
    );

    // Check if any validation error exists
    if (newErrors.username || newErrors.password || newErrors.confirmPassword) {
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let error = "";

    // Validation logic for each field
    switch (name) {
      case "username":
        error = validateUsername(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      default:
        break;
    }

    setUserRegistration({ ...userRegistration, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      // Add form submission logic here
      console.log("Form is valid, submitting...");
    } else {
      console.log("Form has errors, please correct them.");
    }
  };
  const handlback =()=>{
    navigate("/address");
}

  return (
    <>
      <form className="form-body" onSubmit={handleSubmit}>

      <div className="inputGroup1">
          <h1>Step 3</h1>
        </div>
        <div className="inputGroup1">
          <h1>Account Information</h1>
        </div>

        <div className="inputGroup3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            value={userRegistration.username}
            onChange={handleInput}
            name="username"
            id="username"
          />
        </div>

        <div className="inputGroup3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={userRegistration.password}
            onChange={handleInput}
            name="password"
            id="password"
          />
        </div>

        <div className="inputGroup3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Your Password"
            value={userRegistration.confirmPassword}
            onChange={handleInput}
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>

        <div className="error-messages">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>

        <div className="arrow">
        <button className="back" onClick={handlback} >Back</button>
        <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Account;
