import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import { BASE_API_URL } from "../../utils/utils";
import NavBar from "../../components/NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useJWTData } from "../../utils/utils";
import Cookies from "js-cookie";

export default function CheckoutForm({ match, history }) {
  const [decoded_jwt] = useJWTData();

  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [displayAlert, setDisplayAlert] = useState({
    displayed: false,
    message: "",
    variant: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    event.error &&
      setDisplayAlert({
        displayed: true,
        message: event.error.message,
        variant: "danger",
      });
  };

  const resetErrMsg = () => {
    setTimeout(() => {
      setDisplayAlert({ displayed: false, message: "", variant: "" });
    }, 3000);
  };

  const createPaymentIntent = () => {
    setProcessing(true);

    axios
      .post(
        `${BASE_API_URL}create-payment-intent`,
        {
          book_id: match.params.book_id,
          user_id: decoded_jwt.id,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(async (data) => {
        setClientSecret(data.data.clientSecret);

        const payload = await stripe.confirmCardPayment(
          data.data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          }
        );

        if (payload.error) {
          setProcessing(false);
          throw new Error(`Payment failed ${payload.error.message}`);
        } else {
          setProcessing(false);
          setSucceeded(true);
        }
      })
      .catch((err) => {
        setDisplayAlert({
          displayed: true,
          message: err.message,
          variant: "danger",
        });
      });
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  useEffect(() => {
    resetErrMsg();
  }, [displayAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setDisplayAlert({
        displayed: true,
        message: payload.error.message,
        variant: "danger",
      });
      setProcessing(false);
    } else {
      axios
        .post(`${BASE_API_URL}sale`, {
          book_id: match.params.book_id,
          user_id: decoded_jwt.id,
        })
        .then((res) => {
          Cookies.set("jwt", res.data);

          setDisplayAlert({
            displayed: true,
            message: "Payment made successfuly",
            variant: "success",
          });
          setTimeout(() => {
            history.push("/");
          }, 1500);
        });

      setProcessing(false);
      setSucceeded(false);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)} className='mt-5'>
          <Row className='mt-4 mb-4'>
            <Col>
              <h1>Checkout</h1>
            </Col>
            <Col>
              <Alert
                show={displayAlert.displayed}
                variant={displayAlert.variant}
              >
                {displayAlert.message}
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} sm={12}>
              <Form.Group controlId='formGroupEmail'>
                <Form.Control type='email' placeholder='Enter email' />
              </Form.Group>
              <Form.Group controlId='formGroupPassword'>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
              <CardElement
                id='card-element'
                options={cardStyle}
                onChange={handleChange}
              />

              <Button
                type='submit'
                style={{
                  textTransform: "None",
                  marginTop: "3rem",
                  border:
                    processing || disabled || succeeded
                      ? "1px solid #A29191"
                      : "1px solid #232020",
                }}
                disabled={processing || disabled || succeeded}
                id='submit'
              >
                <span id='button-text'>
                  {processing ? (
                    <div className='spinner' id='spinner'></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
