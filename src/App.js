import React, { useState } from 'react';
import "./style.css";
import Sign_up from "./Sign_up.js";


export default function App() {

  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [view, setView] = useState('login');

  const handleInputChange = (event) =>{
    const {name , value} = event.target;
    setLoginData ((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUpClick = () => {
    setView('signup');
  };

  const handleSignInClick = () => {
    setView('login');
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const savedData = JSON.parse(localStorage.getItem('registrationData'));
    if (savedData.email === loginData.email && savedData.password === loginData.password) {
      setSuccessMessage('Login successful!');
    } else {
      setSuccessMessage('Login failed. Please try again.');
    }
    setLoginData({ email: '', password: '' });

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

  };

  return (
    <>
      {view === 'login' &&
        <form onSubmit={handleSubmit}>    
          <div className='log_in'>
            <input type='Email'
                placeholder='Email'
                name='email'
                value={loginData.email}
                onChange={handleInputChange} 
            />
            <input type='password'
              placeholder='Password'
              name='password'
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='btn'>
            <button onClick={handleSignUpClick}>Sign_up</button>
            <button>Sign_in</button>
          </div>
        </form>
      }
      {view === 'signup' &&
        <Sign_up />
      }
      {view === 'signin' &&
        <Sign_in />
      }
       {successMessage && <p>{successMessage}</p>}
    </>
  );
}





