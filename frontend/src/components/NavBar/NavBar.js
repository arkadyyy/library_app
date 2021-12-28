import React from "react";
import Cookies from "js-cookie";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { BoxArrowRight, BoxArrowInLeft } from "react-bootstrap-icons";
import { useJWTData } from "../../utils/utils";

const NavBar = withRouter(({ history }) => {
  const [decoded_jwt] = useJWTData();

  return (
    <Navbar expand='lg' variant='light' bg={"light"}>
      <Container>
        <Navbar.Brand href='/'>Library App</Navbar.Brand>
        {decoded_jwt ? (
          <div>
            <Navbar.Text>{decoded_jwt.firstName}</Navbar.Text>
            {decoded_jwt.is_admin ? (
              <Button
                onClick={() => history.push("/admin")}
                className='mx-2'
                variant='secondary'
                size='sm'
              >
                Admin area
              </Button>
            ) : (
              <Button
                onClick={() => history.push("/user_area")}
                className='mx-2'
                variant='secondary'
                size='sm'
              >
                My Books
              </Button>
            )}
            <OverlayTrigger
              placement={"bottom"}
              overlay={<Tooltip>Sign out</Tooltip>}
            >
              <BoxArrowRight
                style={{ cursor: "pointer", margin: "0 25px" }}
                size={22}
                onClick={() => {
                  Cookies.remove("jwt");
                  history.push("/");
                }}
              />
            </OverlayTrigger>
          </div>
        ) : (
          <>
            <OverlayTrigger
              placement={"bottom"}
              overlay={<Tooltip>Sign In</Tooltip>}
            >
              <BoxArrowInLeft
                onClick={() => {
                  history.push("/sign_in");
                }}
                size={22}
                style={{ cursor: "pointer", margin: "0 25px" }}
              />
            </OverlayTrigger>
          </>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
