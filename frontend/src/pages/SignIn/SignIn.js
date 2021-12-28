import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/utils";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import NavBar from "../../components/NavBar/NavBar";

import axios from "axios";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayAlert, setDisplayAlert] = useState({
    displayed: false,
    message: "",
    variant: "",
  });

  const resetErrMsg = () => {
    setTimeout(() => {
      setDisplayAlert({ displayed: false, message: "", variant: "" });
    }, 3000);
  };

  const onEmailChange = (val) => {
    setEmail(val);
  };

  const onPasswordChange = (val) => {
    setPassword(val);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post(
        `${BASE_API_URL}sign_in`,
        { email, password },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        setDisplayAlert({
          displayed: true,
          message: res.data,
          variant: "success",
        });
        setTimeout(() => {
          history.push("/");
        }, 1000);
      })
      .catch((err) => {
        setDisplayAlert({
          displayed: true,
          message: err.response.data.error.message,
          variant: "danger",
        });
      });
  };

  useEffect(() => {
    resetErrMsg();
  }, [displayAlert]);

  return (
    <>
      <NavBar />
      <Container>
        <Row className='mt-4 mb-4'>
          <Col>
            <h1>Sign In</h1>
          </Col>
          <Col>
            <Alert show={displayAlert.displayed} variant={displayAlert.variant}>
              {displayAlert.message}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={6} sm={12}>
            <Form onSubmit={(e) => handleSignIn(e)} className='mt-5'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  onChange={(e) => onEmailChange(e.target.value)}
                  type='email'
                  placeholder='Enter email'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                  onChange={(e) => onPasswordChange(e.target.value)}
                  type='password'
                  placeholder='Password'
                />
              </Form.Group>

              <Button variant='light' type='submit'>
                Sign In
              </Button>
            </Form>
            <h6 className='mt-5'>Dont have an account ?</h6>
            <Button
              onClick={() => history.push("/sign_up")}
              variant='secondary'
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
