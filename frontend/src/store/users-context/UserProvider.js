import { useEffect, useReducer, useContext } from 'react';
import UsersContext from './users-context';

//Function to check if current jwt token is expired
const checkIfTokenExpired = async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await fetch('http://localhost:8000/lifetime', requestOptions);
  if (!response.ok) {
    return true;
  }
  const responseData = await response.json();
  if (responseData.detail === 'Succeed') {
    return false;
  }
  return true;
}

//Function to check if user is logged in initally when entered to page
const checkIfLoggedIn = async () => {
  if (localStorage.getItem("token") === null) {
    return false;
  } else {
    return (!await checkIfTokenExpired());
  }
}

//Default state is when user is not logged in, and there's nothing to load from users context.
const defaultUsersState = {
  isLoggedIn: false,
  isLoading: true
};

//Users reducer
const usersReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem("token")
    return ({ isLoggedIn: false })
  }
  if (action.type === 'LOGIN') {
    if (action.response) {
      try {
        localStorage.setItem("token", action.response.access_token)
      } catch {
        return ({ isLoggedIn: false, isLoading: state.isLoading })
      }
    }
    return ({ isLoggedIn: true, isLoading: state.isLoading })
  }
  if (action.type === 'START_LOADING') {
    return ({ isLoggedIn: state.isLoggedIn, isLoading: true })
  }
  if (action.type === 'STOP_LOADING') {
    return ({ isLoggedIn: state.isLoggedIn, isLoading: false })
  }
  return defaultUsersState;
};

//The provider to the context with the functions and actions (Dispatch to the reducer above)
const UsersProvider = (props) => {
  useEffect(() => {
    checkIfLoggedIn().then(res => {
      if (res) {
        dispatchUsersAction({ type: 'LOGIN' });
      } else {
        dispatchUsersAction({ type: 'LOGOUT' });
      }
      dispatchUsersAction({ type: 'STOP_LOADING' });
    });
  }, []);

  const [usersState, dispatchUsersAction] = useReducer(
    usersReducer,
    defaultUsersState
  );
  const logOutHandler = () => {
    dispatchUsersAction({ type: 'START_LOADING' });
    dispatchUsersAction({ type: 'LOGOUT' });
    dispatchUsersAction({ type: 'STOP_LOADING' });
  }

  const loginHandler = (resp) => {
    dispatchUsersAction({ type: 'START_LOADING' });
    dispatchUsersAction({ type: 'LOGIN', response: resp });
    dispatchUsersAction({ type: 'STOP_LOADING' });
  }
  const usersContext = {
    isLoggedIn: usersState.isLoggedIn,
    isLoading: usersState.isLoading,
    login: loginHandler,
    logout: logOutHandler
  };


  return (
    <UsersContext.Provider value={usersContext}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;