import React, { useState } from 'react';
import styles from './Forms.module.css';
import logo from '../../assets/logo.png';
import { Link, Navigate } from 'react-router-dom';

const RegisterForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const formData = JSON.stringify({
      username: props.username,
      email: props.email,
      password: props.password
    });
    const request_options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: formData,
    };
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/create', request_options);
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.detail);
      }
      setIsLoading(false);
      setRegisteredSuccessfully(true);
    } catch(error) {
      setIsLoading(false);
      setRegisterError(error.message);
      alert(error.message);
    }
    props.setPassword('');
    props.setEmail('');
    props.setUsername('');
  }
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  const RegisterError = () => {
    return (
      <div className={styles.altContainer}>
        <h3>
          {registerError}
        </h3>
      </div>
    );
  }

  const RegisterSuccessfully = () => {
    return (
      <div className={styles.altContainer}>
        <h3>
          Registered Successfully! Click here to <Link to="/login">login!</Link>
        </h3>
      </div>
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={onSubmitRegister} className={styles.form}>
        <img alt="Instagram clone Logo" src={logo} className={styles.logo} />
        <input onChange={ev => props.setUsername(ev.target.value)} type="text" minLength="4" value={props.username} placeholder="Username" required />
        <input onChange={ev => props.setPassword(ev.target.value)} type="password" minLength="4" value={props.password} placeholder="Password" required />
        <input onChange={ev => props.setEmail(ev.target.value)} type="email" minLength="5" value={props.email} placeholder="Email" required />
        <button type="submit" children="Sign up" />
      </form>
      {registerError && <RegisterError />}
      {registeredSuccessfully && <RegisterSuccessfully />}
    </React.Fragment>
  );
}

export default RegisterForm;