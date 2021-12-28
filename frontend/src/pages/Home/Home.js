import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Filter from "../../components/Filter/Filter";
import { useSelector } from "react-redux";

import BookBtn from "../../components/BookBtn/BookBtn";

const Home = ({ history }) => {
  const books = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  return (
    <>
      <NavBar />
      <Filter books={books} setFilteredBooks={setFilteredBooks} />
      <Container class='container-fluid content-row '>
        <Row>
          {filteredBooks.map((book) => (
            <Col key={book._id} className='m-4' xs={12} md={4} lg={3}>
              <BookBtn book={book} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
