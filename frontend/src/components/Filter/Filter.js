import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useJWTData } from "../../utils/utils";

const Filter = ({ setFilteredBooks, books }) => {
  const [decoded_jwt] = useJWTData();

  const [searchByName, setSearchByName] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");
  const [categoryFilter, setcategoryFilter] = useState({
    Drama: false,
    Comedy: false,
    Fantasy: false,
    History: false,
    Horror: false,
  });

  const onCategoryFilterChange = (type) => {
    setcategoryFilter({
      ...categoryFilter,
      [type]: !categoryFilter[type],
    });
  };

  const handleCategoryChange = (book_obj) => {
    const selected_categories = Object.entries(categoryFilter).reduce(
      (prevVal, curVal) => {
        if (curVal[1] === true) prevVal.push(curVal[0]);
        return prevVal;
      },
      []
    );

    if (selected_categories.length === 0) {
      return true;
    } else {
      return book_obj.categories.some((category) =>
        selected_categories.includes(category)
      );
    }
  };

  const handleNameChange = (book_obj) => {
    if (searchByName.length === 0) {
      return true;
    } else {
      return book_obj.book_name
        .toLowerCase()
        .includes(searchByName.toLowerCase());
    }
  };

  const handleAuthorChange = (book_obj) => {
    if (searchByAuthor.length === 0) {
      return true;
    } else {
      return book_obj.author
        .toLowerCase()
        .includes(searchByAuthor.toLowerCase());
    }
  };

  useEffect(() => {
    let filtered_books = books.filter(
      (book) =>
        handleCategoryChange(book) &&
        handleNameChange(book) &&
        handleAuthorChange(book)
    );
    setFilteredBooks(filtered_books);
  }, [categoryFilter, searchByName, searchByAuthor]);
  return (
    <>
      <Jumbotron>
        <Row>
          <Col md={7} lg={7} sm={12}>
            <h1>Hello,{decoded_jwt ? decoded_jwt.firstName : "visitor"}</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              finibus egestas erat id sodales.
            </p>
            <hr />
          </Col>
        </Row>
        <h6 className='mt-4'>Find Your Desired Book</h6>
        <Row>
          <Col md={4} lg={4} sm={12}>
            <Form.Control
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
              className='mb-3'
              size='sm'
              type='text'
              placeholder='Search By Name'
            />
          </Col>
          <Col>
            <Button
              onClick={() => setSearchByName("")}
              size='sm'
              variant='light'
            >
              Clear
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={4} lg={4} sm={12}>
            <Form.Control
              value={searchByAuthor}
              onChange={(e) => setSearchByAuthor(e.target.value)}
              className='mb-3'
              size='sm'
              type='text'
              placeholder='Search By Author'
            />
          </Col>
          <Col>
            <Button
              onClick={() => setSearchByAuthor("")}
              size='sm'
              variant='light'
            >
              Clear
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={6} sm={12}>
            <Form>
              <p>Search By Category : </p>
              <Row className='ml-1'>
                {[
                  "Drama",
                  "Comedy",
                  "Fantasy",
                  "History",
                  "Horror",
                  "Children",
                  "Philosophy",
                ].map((item, index) => (
                  <Col key={index} md={2} lg={2} sm={12}>
                    <Form.Group id='formGridCheckbox'>
                      <Form.Check
                        onClick={() => onCategoryFilterChange(item)}
                        checked={categoryFilter[item]}
                        type='checkbox'
                        label={item}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Form>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default Filter;
