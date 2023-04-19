import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Sign_up() {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    if (savedData) {
      const existingUser = savedData.find(user => user.email === registrationData.email);
      if (existingUser) {
        setErrorMsg('Email has already been used. Please try a different email address.');
        return;
      }
    }
  
    localStorage.setItem('registrationData', JSON.stringify([...savedData, registrationData]));
    setRegistrationData({
      name: '',
      email: '',
      password: '',
    });
    setSuccessMsg('Registration successful!');
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        
        <input type="text"
         name="name"
          value={registrationData.name}
          placeholder='Name' 
          onChange={handleInputChange} />
      </label>
      <label>
        <input type="email" 
        name="email" 
        placeholder='Email'
        value={registrationData.email} 
        onChange={handleInputChange} />
      </label>
      <label>
        <input type="password"
         name="password"
         placeholder='password' 
         value={registrationData.password} 
         onChange={handleInputChange} />
      </label>
      {/* <ReCAPTCHA sitekey="YOUR_SITE_KEY" onChange={onRecaptchaChange} /> */}
      <button type="submit">Register</button>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </form>
  );
}