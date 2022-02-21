import React, { useState, useContext } from 'react';
import styles from './Forms.module.css';
import Loading from '../UI/loadings/Loading';
import logo from '../../assets/logo.png';
import UsersContext from '../../store/users-context/users-context';
import PostsContext from '../../store/posts-context/posts-context';

const LoginForm = props => {
  const usersCtx = useContext(UsersContext);
  const postsCtx = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const onSubmitLogin = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('username', props.username);
    formData.append('password', props.password);
    const request_options = {
      method: 'POST',
      body: formData,
    };
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/login', request_options);
      if (!response.ok) {
        if(response.status === 401) {
          throw new Error({detail: "Wrong username or password."}.detail);
        }
        throw new Error({detail: "Communication error try again late."}.detail);
      }
      const responseData = await response.json();
      if(responseData.access_token) {
        usersCtx.login(responseData);
        postsCtx.reloadPosts();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
    props.setPassword('');
    props.setUsername('');
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <React.Fragment>
      <form onSubmit={onSubmitLogin} className={styles.form}>
        <img alt="Instagram clone Logo" src={logo} className={styles.logo} />
        <input onChange={ev => props.setUsername(ev.target.value)} type="text" minLength="4" value={props.username} placeholder="Username" required />
        <input onChange={ev => props.setPassword(ev.target.value)} type="password" minLength="4" value={props.password} placeholder="Password" required />
        <button type="submit" children="Log in" />
        {loginError && (<div className={styles.altContainer}><h3>{loginError}</h3></div>)}
      </form>
    </React.Fragment>
  );
}

export default LoginForm;