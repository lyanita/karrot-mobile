import { createStore, combineReducers } from 'redux';
import { user } from './authenticate';
import { inventory } from './inventory';
import { list } from './list';

const storeContext = combineReducers({
    user,
    inventory,
    list
});

export default storeContext;
