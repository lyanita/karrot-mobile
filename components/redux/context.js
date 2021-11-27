import { useSelector, useDispatch } from 'react-redux';

import { updateUser } from './authenticate';
import { updateList } from './list';
import { updateInventory } from './inventory';
import { getUser, getGrocery, getInventory } from '../../utils/api';

export const getUserProfile = async (email, dispatch) => {
    try {
        const response = await getUser(email);
        console.log(response);
        if (response.length > 0) {
            dispatch(updateUser(response[0]));
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getGroceryItems = async (user_id, dispatch) => {
    try {
        const response = await getGrocery(user_id);
        console.log(response);
        dispatch(updateList(response));
    } catch (error) {
        console.error(error);
    } 
}

export const getInventoryItems = async (user_id, dispatch) => {
    try {
        const response = await getInventory(user_id);
        console.log(response);
        dispatch(updateInventory(response));
    } catch (error) {
        console.error(error);
    } 
}