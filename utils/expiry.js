export const expiry = (expiry_date) => {
    const new_date = new Date(expiry_date);
    const current_date = new Date();
    const date_range = Math.floor((new_date - current_date) / (1000*60*60*24));
    return date_range;
}