import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { useJWTData, handleDownload, handlePreview } from "../../utils/utils";

const UserArea = ({ history }) => {
  const [decoded_jwt] = useJWTData();
  const my_books = useSelector((state) => state.books).filter((book) =>
    decoded_jwt.my_books.includes(book._id)
  );

  if (my_books.length === 0) {
    return (
      <>
        <NavBar />
        <Container>
          <Row>
            <Col
              className='mt-5'
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h3 style={{ fontWeight: "100" }}>
                Looks like you dont have any books yet
              </h3>
            </Col>
          </Row>
          <Row>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button variant='light' onClick={() => history.push("/")}>
                browse books
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar />
      {my_books ? (
        <>
          <Container>
            <Row className='my-4'>
              <Col>
                <h1>My Books</h1>
              </Col>
            </Row>
            <Row>
              <Col className='mx-5'>
                {my_books.map((book) => (
                  <Card
                    className='m-3 p-2'
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Title style={{ fontWeight: "100" }}>
                      {book.book_name}
                    </Card.Title>
                    <div>
                      <Button
                        className='m-1'
                        onClick={() => handleDownload(book._id)}
                        variant='light'
                      >
                        Download
                      </Button>
                      <Button
                        className='m-1'
                        onClick={() => handlePreview(book._id)}
                        variant='light'
                      >
                        Preview
                      </Button>
                    </div>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default UserArea;
