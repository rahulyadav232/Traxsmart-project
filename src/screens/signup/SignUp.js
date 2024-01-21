import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate(); // Import navigate

  const [userRegistration, setUserRegistration] = useState({
    fullname: "",
    email: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation logic for each field
    if (userRegistration.fullname.length < 3) {
      newErrors.fullname = "Full Name must be at least 3 characters";
      valid = false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userRegistration.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Validate date format (you may need a more sophisticated date validation)
    if (!userRegistration.dob) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

 const validateFullName = (value) => {
  if (value.length < 3) {
    return "Full Name must be at least 3 characters";
  }
  return "";
};

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Invalid email format";
  }
  return "";
};

const validateDOB = (value) => {
  if (!value) {
    return "Date of Birth is required";
  }
  return "";
};

const handleInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  let error = "";

  // Validation logic for each field
  switch (name) {
    case "fullname":
      error = validateFullName(value);
      break;
    case "email":
      error = validateEmail(value);
      break;
    case "dob":
      error = validateDOB(value);
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
      navigate("/address");
    } else {
      console.log("Form has errors, please correct them.");
    }
  };

  return (
    <>
      <form className="form-body" onSubmit={handleSubmit}>
      <div className="inputGroup1">
          <h1>Step 1</h1>
        </div>
      <div className="inputGroup1">
        <h1>Personal Information</h1>
      </div>

      <div className="inputGroup3">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={userRegistration.fullname}
            onChange={handleInput}
            name="fullname"
            id="fullname"
          />
        </div>

        <div className="inputGroup3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            value={userRegistration.email}
            onChange={handleInput}
            name="email"
            id="email"
          />
        </div>

        <div className="inputGroup3">
          <label htmlFor="dob">Date Of Birth</label>
          <input
            type="date"
            placeholder="Enter Your DOB"
            value={userRegistration.dob}
            onChange={handleInput}
            name="dob"
            id="dob"
          />
        </div>

        <div className="error-messages">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>

        <button type="submit">Continue</button>
      </form>
    </>
  );
};

export default SignUp;
