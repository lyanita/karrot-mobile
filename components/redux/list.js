const UPDATE_LIST = 'UPDATE_LIST';

export const updateList = (list) => {
    return {
        type: UPDATE_LIST,
        list,
    }
}

const defaultList = [];

export const list = (state=defaultList, action) => {
    switch (action.type) {
        case UPDATE_LIST:
            return [action.list];
        default:
            return state;
    }
}