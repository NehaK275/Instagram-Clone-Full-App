import { useEffect, useReducer, useState } from 'react';
import PostsContext from './posts-context';

//Default state
const defaultPostsState = {
  posts: [],
  isLoading: true,
  deletePost: () => { },
  reloadPosts: () => { }
};

//Posts reducer
const postsReducer = (state, action) => {
  if (action.type === 'GET') {
    return ({ posts: action.value, isLoading: state.isLoading, deletePost: state.deletePost, reloadPosts: state.reloadPosts })
  }
  if (action.type === 'DELETE') {
    deletePostById(action.id, action.reloadPosts);
    return ({ posts: state.posts, isLoading: state.isLoading, deletePost: state.deletePost, reloadPosts: state.reloadPosts })
  }
  if (action.type === 'START_LOADING') {
    return ({ isLoading: true, posts: state.posts, deletePost: state.deletePost, reloadPosts: state.reloadPosts })
  }
  if (action.type === 'STOP_LOADING') {
    return ({ isLoading: false, posts: state.posts, deletePost: state.deletePost, reloadPosts: state.reloadPosts })
  }
  return defaultPostsState;
};

//Functions and actions.
const getPosts = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };
  const response = await fetch('http://localhost:8000/posts/all', requestOptions);
  if (!response.ok) {
    throw new Error();
  }
  const responseData = await response.json();
  return responseData;
}

const deletePostById = async (id, reloadPosts) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    const response = await fetch('http://localhost:8000/posts/delete/' + id, requestOptions);
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.detail);
    }
    const responseData = await response.json();
    reloadPosts();
  } catch (err) {
    alert(err.message);
  }
}

//The provider with inital values.
const PostsProvider = (props) => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [postsState, dispatchPostsAction] = useReducer(
    postsReducer,
    defaultPostsState
  );
  const reloadPosts = () => {
    setRefreshPosts(prev => !prev);
  }
  useEffect(() => {
    dispatchPostsAction({ type: 'START_LOADING' });
    getPosts().then(res => {
      dispatchPostsAction({
        type: 'GET',
        value: res
      });
      dispatchPostsAction({ type: 'STOP_LOADING' });
    }).catch(err => {
      console.log(err);
      dispatchPostsAction({ type: 'STOP_LOADING' });
    })
  }, [refreshPosts]);

  const onDeletePostHandler = id => {
    dispatchPostsAction({ type: 'START_LOADING' });
    dispatchPostsAction({
      type: 'DELETE',
      id,
      reloadPosts
    });
    dispatchPostsAction({ type: 'STOP_LOADING' });
  }
  const postsContext = {
    isLoading: postsState.isLoading,
    posts: postsState.posts,
    deletePost: onDeletePostHandler,
    reloadPosts
  };
  return (
    <PostsContext.Provider value={postsContext}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;