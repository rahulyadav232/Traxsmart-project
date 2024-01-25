import React, { useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [userRegistration, setUserRegistration] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [errors, setErrors] = useState({});

  const validateStreet = (value) => {
    if (value.length < 5) {
      return "Street Address must be at least 5 characters";
    }
    return "";
  };

  const validateCity = (value) => {
    if (value.length < 3) {
      return "City must be at least 3 characters";
    }
    return "";
  };

  const validateState = (value) => {
    if (!value) {
      return "State is required";
    }
    return "";
  };

  const validateZipcode = (value) => {
    const zipCodeRegex = /^\d+$/;
    if (!zipCodeRegex.test(value)) {
      return "Zip Code must be a valid numeric format";
    }
    return "";
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    newErrors.street = validateStreet(userRegistration.street);
    newErrors.city = validateCity(userRegistration.city);
    newErrors.state = validateState(userRegistration.state);
    newErrors.zipcode = validateZipcode(userRegistration.zipcode);

    // Check if any validation error exists
    if (
      newErrors.street ||
      newErrors.city ||
      newErrors.state ||
      newErrors.zipcode
    ) {
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
      case "street":
        error = validateStreet(value);
        break;
      case "city":
        error = validateCity(value);
        break;
      case "state":
        error = validateState(value);
        break;
      case "zipcode":
        error = validateZipcode(value);
        break;
      default:
        break;
    }

    setUserRegistration({ ...userRegistration, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    
    // console.log(userRegistration);
    try {
      const response = await fetch('http://localhost:5000/users/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRegistration),
      });
            // console.log(response)
            if (response.ok && response.status===201) {
              navigate("/login"); 
              // Handle successful insertion (e.g., show a success message)
    
              console.log('Data inserted successfully!');
            } else {
              // Handle insertion failure
              console.error('Failed to insert data.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    
        // console.log(records);
        const newRecord = {
          ...userRegistration,
          id: new Date().getTime().toString(),
        };
        
    
        setUserRegistration({
            street: "",
            city: "",
            state: "",
            zipcode: "",
    
        });

    // Validate the form before submitting
    if (validateForm()) {
      // Add form submission logic here
      console.log("Form is valid, submitting...");
      navigate("/account");
    } else {
      console.log("Form has errors, please correct them.");
    }
  };
const handlback =()=>{
    navigate("/");
}
  return (
    <>
      <form className="form-body" onSubmit={handleSubmit}>
      <div className="inputGroup1">
          <h1>Step 2</h1>
        </div>
        <div className="inputGroup1">
          <h1>Address Information</h1>
        </div>

        <div className="inputGroup3">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            placeholder="Enter Your Street"
            value={userRegistration.street}
            onChange={handleInput}
            name="street"
            id="street"
          />
        </div>

        <div className="inputGroup3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Enter Your City"
            value={userRegistration.city}
            onChange={handleInput}
            name="city"
            id="city"
          />
        </div>

        <div className="inputGroup3">
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={userRegistration.state}
            onChange={handleInput}
          >
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="IN">India</option>
            {/* Add more states as needed */}
          </select>
        </div>

        <div className="inputGroup3">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="number"
            placeholder="Enter Your Zipcode"
            value={userRegistration.zipcode}
            onChange={handleInput}
            name="zipcode"
            id="zipcode"
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
        <button type="submit">Continue</button>
        </div>
      </form>
    </>
  );
};

export default Address;
