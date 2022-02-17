import React, { useEffect, useState } from 'react';
import Post from './components/posts/Post';
import Layout from './components/layout/Layout';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import Posts from './components/posts/Posts';
import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);

  const logOutHandler = () => {
    setAuthToken(null);
    setAuthTokenType(null);
  }

  return (
    <Layout isLoggedIn={authToken && authTokenType} logOutHandler={logOutHandler} >
      <Routes location={location} key={location.pathname}>
        <Route exact path='/login' element={<LoginForm setAuthToken={setAuthToken} setAuthTokenType={setAuthTokenType} />} />
        <Route exact path='/signup' element={<RegisterForm authToken={authToken} authTokenType={authTokenType} />} />
        <Route exact path='/' element={<Posts />} />
      </Routes>
    </Layout>
  );
}

export default App;
