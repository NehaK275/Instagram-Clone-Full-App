import React, { useState, useContext } from 'react';
import Layout from './components/layout/Layout';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import Posts from './components/posts/Posts';
import UsersContext from './store/users-context/users-context';
import PostsContext from './store/posts-context/posts-context';
import CommentsContext from './store/comments-context/comments-context';
import Loading from './components/UI/loadings/Loading';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const usersCtx = useContext(UsersContext);
  const postsCtx = useContext(PostsContext);
  const commentsCtx = useContext(CommentsContext);
  const [contentLoading, setContentLoading] = useState(usersCtx.isLoading);
  //For passing location and pathname to Routes.
  const location = useLocation();
  //Made the inputs state below so I can use them in the sign up and the login page both.
  const [uploadModal, setUploadModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  if (usersCtx.isLoading) {
    return (
        <Loading />
    );
  }

  return (
    <Layout>
      {(postsCtx.isLoading ||  commentsCtx.isLoading) && <Loading />}
      <Routes location={location} key={location.pathname}>
        <Route exact path='/login' element={usersCtx.isLoggedIn ? <Navigate to="/" /> : <LoginForm password={password} username={username} setUsername={setUsername} setPassword={setPassword} />} />
        <Route exact path='/signup' element={<RegisterForm password={password} username={username} email={email} setEmail={setEmail} setUsername={setUsername} setPassword={setPassword} />} />
        <Route exact path='/' element={<Posts />} />
      </Routes>
    </Layout>
  );
}

export default App;
