import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Jj7tyGOmDndD4UKWnGJl5NFO6YrttEH42m1X4RNdZ70GHtnAmqsnYIMjw7YgIwX81YfWiefocNpuogUa1a99VI900llLl8MiU"
);

const appearance = {
  theme: "stripe",
};
const options = {
  appearance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements options={options} stripe={promise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
