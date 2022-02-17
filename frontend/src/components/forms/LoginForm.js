import React, { useState } from 'react';
import styles from './Forms.module.css';
import logo from '../../assets/logo.png';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const request_options = {
      method: 'POST',
      body: formData,
    };
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/login', request_options);
      if (!response.ok) {
        throw new Error();
      }
      const responseData = await response.json();
      console.log(responseData);
      props.setAuthToken(responseData.access_token);
      props.setAuthTokenType(responseData.token_type);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }

  }
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div>
        {error}
        There's a network problem, try again later.
      </div>
    );
  }
  return (
    <form onSubmit={onSubmitLogin} className={styles.loginForm}>
      <img alt="Instagram clone Logo" src={logo} className={styles.logo} />
      <input onChange={ev => setUsername(ev.target.value)} type="text" minlength="4" value={username} placeholder="Username" required />
      <input onChange={ev => setPassword(ev.target.value)} type="password" minlength="4" minvalue={password} placeholder="Password" required />
      <button type="submit" children="Log in" />
    </form>
  );
}

export default LoginForm;