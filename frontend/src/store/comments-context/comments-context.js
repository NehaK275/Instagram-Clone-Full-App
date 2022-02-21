import React from 'react';

const CommentsContext = React.createContext({
    isLoading: false,
    deleteComment: () => { },
    addComment: () => { }
});

export default CommentsContext;