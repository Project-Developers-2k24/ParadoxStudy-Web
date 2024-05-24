const { BASE_URL } = require('./client');

export const REGISTER = `${BASE_URL}/user/register`;
export const RESET_EMAIL = `${BASE_URL}/user/send-reset-password-email`;
export const RESET_PASSWORD = (id, token) => `${BASE_URL}/user/reset-password/${id}/${token}`;
export const LOGIN = `${BASE_URL}/user/login`;
export const VERIFIED = (id) => `${BASE_URL}/user/accept/${id}`;
export const UPDATE = `${BASE_URL}/user/updateProfile`;
export const USERBYID = `${BASE_URL}/user/userById`;
