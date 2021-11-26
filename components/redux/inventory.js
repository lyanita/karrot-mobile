const UPDATE_INVENTORY = 'UPDATE_INVENTORY';

export const updateInventory= (inventory) => {
    return {
        type: UPDATE_INVENTORY,
        inventory,
    }
}

const defaultInventory = [];

export const inventory = (state=defaultInventory, action) => {
    switch (action.type) {
        case UPDATE_INVENTORY:
            return [action.inventory];
        default:
            return state;
    }
}