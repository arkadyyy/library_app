import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { adminCheck } from "../store/actions/actions";

// export const BASE_API_URL = "http://localhost:9999/";
export const BASE_API_URL = "/";

export const useJWTData = () => {
  const decoded_jwt = Cookies.get("jwt")
    ? jwt_decode(Cookies.get("jwt"))
    : null;

  const dispatch = useDispatch();
  if (decoded_jwt === null) {
    dispatch(adminCheck(false));
  } else if (decoded_jwt.is_admin === false) {
    dispatch(adminCheck(false));
  } else {
    dispatch(adminCheck(true));
  }

  return [decoded_jwt];
};

export const handleDownload = (id) => {
  window.open(`${BASE_API_URL}download?book_id=${id}`);
};

export const handlePreview = (id) => {
  axios(`${BASE_API_URL}download?book_id=${id}`, {
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
    .catch((error) => {
      console.log(error);
    });
};
