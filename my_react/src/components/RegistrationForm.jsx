import React, { useRef, useState } from 'react';

const RegistrationForm = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!firstName || !nameRegex.test(firstName)) {
      newErrors.firstName = "First name is required and should contain only alphabets.";
    }
    if (!lastName || !nameRegex.test(lastName)) {
      newErrors.lastName = "Last name is required and should contain only alphabets.";
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, and 1 special char.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(''); 
    
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('Validation Failed');
    } else {
      setErrors({});
      setStatus('Form Submitted Successfully!');
      console.log("Submitted Data:", {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>First Name:</label>
          <input type="text" ref={firstNameRef} style={inputStyle} />
          {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" ref={lastNameRef} style={inputStyle} />
          {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" ref={emailRef} style={inputStyle} />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input type="password" ref={passwordRef} style={inputStyle} />
          {errors.password && <p style={errorStyle}>{errors.password}</p>}
        </div>

        <button type="submit" style={buttonStyle}>Register</button>
      </form>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          color: status.includes('Success') ? 'green' : 'red',
          backgroundColor: '#f3f3f3' 
        }}>
          {status}
        </div>
      )}
    </div>
  );
};

const inputStyle = { width: '100%', padding: '8px', marginBottom: '5px' };
const errorStyle = { color: 'red', fontSize: '12px', margin: '0 0 10px 0' };
const buttonStyle = { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'black' };

export default RegistrationForm;