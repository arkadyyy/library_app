import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const AddTab = ({
  editedUser,
  handleBookSearch,
  handleAddBook,
  handleBookSearchChange,
  matchingBooks,
  searchBy,
  handleSearchBy,
  searchBook,
}) => {
  return (
    <>
      <Form onSubmit={(e) => handleBookSearch(e, searchBook)}>
        <p>Search By : </p>
        <Row className='ml-1 mb-2'>
          {searchBy.map((key, index) => (
            <Form.Check
              checked={Object.values(key)[0]}
              className='mr-4'
              onClick={() => handleSearchBy(key, index)}
              type='radio'
              label={Object.keys(key)[0]}
              name='formHorizontalRadios'
              id='formHorizontalRadios1'
            />
          ))}
        </Row>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Control
            onChange={(e) => handleBookSearchChange(e.target.value)}
            type='text'
            placeholder='Search'
          />
        </Form.Group>
        <Button type='submit' variant='light'>
          Search
        </Button>
      </Form>
      {matchingBooks && (
        <>
          <Row className='my-4'>
            <Col>
              <h6 style={{ fontWeight: "400" }}>
                Books found matching your search :{" "}
              </h6>
            </Col>
          </Row>
          <Row
            style={{
              overflowY: "scroll",

              maxHeight: "13rem",
            }}
          >
            <Col>
              {matchingBooks.map((book) => (
                <>
                  <Card className='border-0'>
                    <Row>
                      <Col md={5} lg={5} sm={6}>
                        <h5 style={{ fontWeight: "100" }}>
                          {book.book_name} - {book.author}
                        </h5>
                      </Col>
                      <Col md={3} lg={3} sm={12}>
                        {editedUser.my_books.includes(book._id) ? (
                          <p>User has book</p>
                        ) : (
                          <Button
                            onClick={() => {
                              console.log(editedUser);
                              handleAddBook(book._id, editedUser._id);
                            }}
                            variant='light'
                          >
                            Add Book
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <hr style={{ width: "70%" }} />
                  </Card>
                </>
              ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AddTab;
