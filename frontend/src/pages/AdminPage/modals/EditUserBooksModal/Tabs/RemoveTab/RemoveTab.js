import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";

const RemoveTab = ({ handleBookRemove, relevantBooks, editedUser }) => {
  return (
    <>
      <Row>
        <Col style={{ overflowY: "scroll" }}>
          {relevantBooks.map((book, index) => (
            <Card className='border-0 mt-3'>
              <Row className='m-2 '>
                <Col>
                  {book.book_name} - {book.author}
                </Col>

                <Col>
                  <Button
                    onClick={() => handleBookRemove(editedUser._id, book._id)}
                    variant='light'
                  >
                    Remove book
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default RemoveTab;
