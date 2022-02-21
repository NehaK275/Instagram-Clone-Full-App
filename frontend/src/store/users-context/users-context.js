import React from 'react';

const UsersContext = React.createContext({
  isLoggedIn: () => {},
  isLoading: true
});

export default UsersContext;