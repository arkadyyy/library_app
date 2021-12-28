import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import BookPage from "./pages/BookPage/BookPage";
import CheckoutForm from "./pages/CheckoutForm/CheckoutForm";
import UserArea from "./pages/UserArea/UserArea";
import AdminPage from "./pages/AdminPage/AdminPage";
import { useDispatch } from "react-redux";
import { getBooks } from "./store/operations/operations";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' exact component={Home} />
          <Route exact path='/book_page/:book_id' exact component={BookPage} />
          <Route
            exact
            path='/checkout/:book_id'
            exact
            component={CheckoutForm}
          />
          <Route exact path='/sign_up' exact component={SignUp} />
          <Route exact path='/sign_in' exact component={SignIn} />
          <Route exact path='/user_area' exact component={UserArea} />
          <Route exact path='/admin' exact component={AdminPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
