import * as types from "../types/types";
const initalState = {
  books: [],
  users: [],
  is_admin: false,
};

export const Reducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case types.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case types.ADMIN_CHECK:
      return {
        ...state,
        is_admin: action.payload,
      };

    default:
      return state;
  }
};
