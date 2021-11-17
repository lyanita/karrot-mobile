import { combineReducers } from 'redux';

const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user,
    }
}

const defaultUser = [
    {
        email: '',
        id: 0,
    }
];

const user = (state=defaultUser, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return [
                //...state,
                {
                    email: action.user.email,
                    id: action.user.user_id
                }
            ];
        default:
            return state;
    }
}

const userApp = combineReducers({
    user
});

export default userApp;