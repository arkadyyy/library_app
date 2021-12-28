import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/utils";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/NavBar/NavBar";

import axios from "axios";

const SignUp = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayAlert, setDisplayAlert] = useState({
    displayed: false,
    message: "",
    variant: "",
  });

  const onFirstNameChange = (val) => {
    setFirstName(val);
  };

  const onLastNameChange = (val) => {
    setLastName(val);
  };

  const onEmailChange = (val) => {
    setEmail(val);
  };

  const onPasswordChange = (val) => {
    setPassword(val);
  };

  const resetErrMsg = () => {
    setTimeout(() => {
      setDisplayAlert({ displayed: false, message: "", variant: "" });
    }, 3000);
  };

  const signUpHandler = (e) => {
    console.log({ password, firstName, lastName, email });
    e.preventDefault();
    axios
      .post(`${BASE_API_URL}sign_up`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        setDisplayAlert({
          displayed: true,
          message: res.data,
          variant: "success",
        });
        setTimeout(() => {
          history.push("/sign_in");
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
            <h1>Sign Up</h1>
          </Col>
          <Col>
            <Alert show={displayAlert.displayed} variant={displayAlert.variant}>
              {displayAlert.message}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={6} sm={12}>
            <Form onSubmit={(e) => signUpHandler(e)}>
              <h6 className='mb-4'>Personal Info</h6>
              <Form.Group className='mb-3'>
                <Form.Control
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  type='text'
                  placeholder='First Name'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Control
                  onChange={(e) => onLastNameChange(e.target.value)}
                  type='text'
                  placeholder='Last Name'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  onChange={(e) => onEmailChange(e.target.value)}
                  type='email'
                  placeholder='Email'
                />
              </Form.Group>
              <h6 className='mb-4'>Password</h6>
              <Form.Group className='mb-3'>
                <Form.Control
                  onChange={(e) => onPasswordChange(e.target.value)}
                  type='password'
                  placeholder='Password'
                />
              </Form.Group>

              <Button variant='light' type='submit'>
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
