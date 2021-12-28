import { getAllBookData, getAllUsersData } from "../services/services";
import { getAllBooks, getAllUsers } from "../actions/actions";

export const getBooks = () => async (dispatch, getState) => {
  const books = await getAllBookData();
  dispatch(getAllBooks(books));
};

export const getUsers = () => async (dispatch, getState) => {
  const users = await getAllUsersData();
  dispatch(getAllUsers(users));
};
