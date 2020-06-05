// import posts from '../posts.json';

const initialState = {
    posts: [],
}; 

export default function(state = initialState, action) {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
            };
        case 'REMOVE_POST':
            return {
                ...state,
            }
        default:
            return state;
    }
}