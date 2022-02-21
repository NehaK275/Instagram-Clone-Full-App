import React from 'react';
import UsersProvider from './users-context/UserProvider';
import PostsProvider from './posts-context/PostsProvider';
import CommentsProvider from './comments-context/CommentsProvider';

const ContextProvider = props => {
  return (
    <React.Fragment>
      <UsersProvider>
        <PostsProvider>
          <CommentsProvider>
            {props.children}
          </CommentsProvider>
        </PostsProvider>
      </UsersProvider>
    </React.Fragment>
  );
}

export default ContextProvider;