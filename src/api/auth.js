const { BASE_URL } = require('./client');

export const REGISTER = `${BASE_URL}/user/register`;
export const LOGIN = `${BASE_URL}/user/login`;
export const VERIFIED = (id) => `${BASE_URL}/user/accept/${id}`;
