import axios from "axios";
import { BASE_API_URL } from "../../utils/utils";

export const getAllBookData = async () => {
  let books;
  await axios.get(`${BASE_API_URL}all_books`).then((res) => {
    books = res.data;
  });
  return books;
};

export const getAllUsersData = async () => {
  let users;
  await axios.get(`${BASE_API_URL}all_users`).then((res) => {
    users = res.data;
  });
  return users;
};
