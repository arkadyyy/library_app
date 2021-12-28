import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import NavBar from "../../components/NavBar/NavBar";
import { ChevronLeft } from "react-bootstrap-icons";
import { useJWTData, handleDownload } from "../../utils/utils";
const BookPage = ({ history, match }) => {
  const books = useSelector((state) => state.books);
  const is_admin = useSelector((state) => state.is_admin);

  const [book, setBook] = useState(null);

  const [decoded_jwt] = useJWTData();
  console.log(decoded_jwt);
  useEffect(() => {
    setBook(books.find((book) => book._id === match.params.book_id));
  }, [books]);

  const hasBook = () =>
    decoded_jwt ? decoded_jwt.my_books.includes(book._id) : false;

  if (!book) {
    return (
      <>
        <NavBar />

        <Container>
          <Row>
            <Col md={12}>
              <Spinner animation='grow' />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <div
            onClick={() => history.goBack()}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <ChevronLeft className='my-5 mr-2' size={22} />
            <h6>Back</h6>
          </div>
        </Row>
        <Row>
          <Col xs={12} md={8} lg={8}>
            <Image
              style={{
                width: "400px",
                height: "400px",
                border: "1px solid #223322",
              }}
              src={book.book_pic[0]}
            />
          </Col>
          <Col xs={12} md={4} lg={4}>
            <h2>{book.book_name}</h2>
            <h6>{book.author}</h6>
            {book.categories.map((category) => (
              <Badge key={category} className='mr-3 mb-4' variant='secondary'>
                {category}
              </Badge>
            ))}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              finibus egestas erat id sodales. Morbi in congue tortor. Nullam a
              posuere arcu. Duis eget velit pharetra, lobortis enim id, dapibus
              tortor. Duis pellentesque tempor erat eu laoreet. Phasellus
              molestie nisl a turpis viverra, eu tristique eros vulputate.
              Maecenas pellentesque nibh et fermentum pellentesque.
            </p>

            <h6>price : ${book.price}</h6>

            {is_admin ? null : !hasBook() && decoded_jwt !== null ? (
              <>
                <Button
                  onClick={() => history.push(`/checkout/${book._id}`)}
                  variant='light'
                  className='mt-4 mr-3'
                >
                  Buy Now
                </Button>
              </>
            ) : decoded_jwt === null ? (
              <>
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id='tooltip-disabled'>
                      To buy the book , sign in
                    </Tooltip>
                  }
                >
                  <span className='d-inline-block'>
                    <Button
                      variant='light'
                      className='mt-4'
                      disabled
                      style={{ pointerEvents: "none" }}
                    >
                      Buy Now
                    </Button>
                  </span>
                </OverlayTrigger>
              </>
            ) : null}

            {is_admin ? (
              <Button
                onClick={() => handleDownload(book._id)}
                variant='light'
                className='mt-4'
              >
                Download
              </Button>
            ) : hasBook() ? (
              <Button
                onClick={() => handleDownload(book._id)}
                variant='light'
                className='mt-4'
              >
                Download
              </Button>
            ) : (
              <OverlayTrigger
                placement='bottom'
                overlay={
                  <Tooltip id='tooltip-disabled'>
                    To download, buy the book
                  </Tooltip>
                }
              >
                <span className='d-inline-block'>
                  <Button
                    variant='light'
                    className='mt-4'
                    disabled
                    style={{ pointerEvents: "none" }}
                  >
                    Download
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default BookPage;
