import { useContext, useReducer } from 'react';
import PostsContext from '../posts-context/posts-context';
import CommentsContext from './comments-context';

//Default state.
const defaultCommentsState = {
    isLoading: false,
    deleteComment: () => { },
    addComment: () => { }
};

//Comments reducer
const commentsReducer = (state, action) => {
    if (action.type === 'ADD') {
        addComment(action.text, action.post_id, action.reloadPosts);
        return state;
    }
    if (action.type === 'DELETE') {
        deleteCommentById(action.id, action.reloadPosts);
        return state;
    }
    if (action.type === 'START_LOADING') {
        return ({ isLoading: true, deleteComment: state.deleteComment, addComment: state.addComment });
    }
    if (action.type === 'STOP_LOADING') {
        return ({ isLoading: false, deleteComment: state.deleteComment, addComment: state.addComment })
    }
    return defaultCommentsState;
};

//Functions and actions.
const deleteCommentById = async (id, reloadPosts) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };
        const response = await fetch('http://localhost:8000/comments/delete/' + id, requestOptions);
        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.detail);
        }
        reloadPosts()
    } catch (err) {
        alert(err.message);
    }
}

const addComment = async (text, post_id, reloadPosts) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                text,
                post_id
            })
        };
        const response = await fetch('http://localhost:8000/comments/create/', requestOptions);
        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.detail);
        }
        reloadPosts();
    } catch (err) {
        alert(err.message);
    }
}

//The provider with inital values.
const CommentsProvider = (props) => {
    const postsCtx = useContext(PostsContext);
    const [commentsState, dispatchCommentsAction] = useReducer(
        commentsReducer,
        defaultCommentsState
    );

    const deleteCommentHandler = id => {
        dispatchCommentsAction({ type: 'START_lOADING' });
        dispatchCommentsAction({
            type: 'DELETE',
            id,
            reloadPosts: postsCtx.reloadPosts
        });
        dispatchCommentsAction({ type: 'STOP_lOADING' });
    }
    const addCommentHandler = (text, post_id) => {
        dispatchCommentsAction({ type: 'START_lOADING' });
        dispatchCommentsAction({
            type: 'ADD',
            text,
            post_id,
            reloadPosts: postsCtx.reloadPosts
        });
        dispatchCommentsAction({ type: 'STOP_lOADING' });
    }

    const commentsContext = {
        isLoading: commentsState.isLoading,
        deleteComment: deleteCommentHandler,
        addComment: addCommentHandler
    };
    return (
        <CommentsContext.Provider value={commentsContext}>
            {props.children}
        </CommentsContext.Provider>
    );
};

export default CommentsProvider;