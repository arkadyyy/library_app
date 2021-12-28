import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

const BookBtn = withRouter(({ book, history }) => {
  return (
    <>
      <Card className='container-fluid' style={{ minWidth: "18rem", flex: 1 }}>
        <Card.Img variant='top' src={book.book_pic[0]} />
        <Card.Body>
          <Card.Title>{book.book_name}</Card.Title>
          <Card.Text>{book.author}</Card.Text>
          <Button
            onClick={() => history.push(`/book_page/${book._id}`)}
            variant='light'
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    </>
  );
});

export default BookBtn;
