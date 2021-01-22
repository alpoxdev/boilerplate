import { handleActions } from 'redux-actions';

const rootState = 'init';

export default handleActions(
    {
        PAGE: (state, action) => {
            if (action.payload) return action.payload;
            return state;
        },
    },
    rootState,
);
