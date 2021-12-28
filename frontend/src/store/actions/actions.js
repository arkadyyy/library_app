import * as types from "../types/types";

export const getAllBooks = (books) => {
  return { type: types.GET_ALL_BOOKS, payload: books };
};
export const getAllUsers = (users) => {
  return { type: types.GET_ALL_USERS, payload: users };
};

export const adminCheck = (bool) => {
  return { type: types.ADMIN_CHECK, payload: bool };
};
