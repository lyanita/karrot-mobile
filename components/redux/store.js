import { createStore, combineReducers } from 'redux';

const store = createStore(() => ({
    user: [
        {
            email: '',
            id: 0
        }
    ]
}));

export default store;