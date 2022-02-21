import React from 'react';

const PostsContext = React.createContext({
  posts: [],
  isLoading: true,
  deletePost: () => { },
  reloadPosts: () => { }
});

export default PostsContext;