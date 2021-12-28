import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/utils";
import axios from "axios";
import "./AdminPage.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/operations/operations";
import { getAllUsers } from "../../store/actions/actions";
import EditUserModal from "./modals/EditUserModal/EditUserModal";
import EditUserBooksModal from "./modals/EditUserBooksModal/EditUserBooksModal";
import { Redirect } from "react-router-dom";

const AdminPage = () => {
  const dispatch = useDispatch();

  const [showBookEditModal, setshowBookEditModal] = useState(false);
  const [showUserEditModal, setshowUserEditModal] = useState(false);
  const [searchBook, setSearchBook] = useState("");
  const [matchingBooks, setMatchingBooks] = useState(null);
  const [searchBy, setSearchBy] = useState([{ Name: true }, { Author: false }]);

  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    my_books: [],
  });
  const [displayAlert, setDisplayAlert] = useState({
    displayed: false,
    message: "",
    variant: "",
  });

  const users = useSelector((state) => state.users);
  const books = useSelector((state) => state.books);
  const is_admin = useSelector((state) => state.is_admin);

  const resetErrMsg = () => {
    setTimeout(() => {
      setDisplayAlert({ displayed: false, message: "", variant: "" });
    }, 3000);
  };

  const handleSearchBy = (key, index) => {
    let updated_searchBy = JSON.parse(JSON.stringify(searchBy)).map((obj) => {
      return {
        [Object.keys(obj)[0]]: false,
      };
    });

    updated_searchBy[index] = { [Object.keys(key)[0]]: true };

    setSearchBy(updated_searchBy);
  };

  const handleBookEditModal = (index) => {
    setEditedUser(users[index]);
    setshowBookEditModal(!showBookEditModal);
    setMatchingBooks(null);
    setSearchBook("");
  };

  const handleBookSearchChange = (val) => {
    setSearchBook(val);
  };

  const handleUserEditModal = (index) => {
    console.log(users[index]);
    setEditedUser(users[index]);
    setshowUserEditModal(!showUserEditModal);
  };

  const handleEditUserChange = (key, value) => {
    setEditedUser({ ...editedUser, [key]: value });
  };

  const handleAddBook = (id, user_id) => {
    axios.post(`${BASE_API_URL}add_book`, { id, user_id }).then((res) => {
      dispatch(getAllUsers(res.data));
      let relevant_user = res.data.filter(
        (obj) => obj._id === editedUser._id
      )[0];
      setEditedUser(relevant_user);

      setDisplayAlert({
        displayed: true,
        message: "Book added successfuly",
        variant: "success",
      });
    });
  };

  const handleBookRemove = (user_id, book_id) => {
    axios
      .delete(
        `${BASE_API_URL}remove_book?user_id=${user_id}&book_id=${book_id}`
      )
      .then((res) => {
        console.log(res);
        dispatch(getAllUsers(res.data));
        let relevant_user = res.data.filter(
          (obj) => obj._id === editedUser._id
        )[0];
        setEditedUser(relevant_user);
        setDisplayAlert({
          displayed: true,
          message: "Book deleted successfuly",
          variant: "success",
        });
      });
  };

  const handleBookSearch = (e, val) => {
    e.preventDefault();
    let search_type;

    searchBy.forEach((obj) => {
      if (Object.values(obj)[0]) search_type = obj;
    });

    axios
      .post(`${BASE_API_URL}search_book`, {
        search_type: Object.keys(search_type)[0],
        val,
      })
      .then((res) => {
        setMatchingBooks(res.data);
      });
  };

  const handleUserDelete = (id) => {
    axios
      .delete(`${BASE_API_URL}delete_user?user_id=${id}`)
      .then((res) => {
        dispatch(getAllUsers(res.data));

        setDisplayAlert({
          displayed: true,
          message: "User deleted successfuly",
          variant: "success",
        });
      })
      .catch((err) => {
        setDisplayAlert({
          displayed: true,
          message: err.response.data.error.message,
          variant: "danger",
        });
      });
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_API_URL}update_user`, editedUser)
      .then((res) => {
        console.log(res);
        setshowUserEditModal(!showUserEditModal);
        dispatch(getAllUsers(res.data));
        setDisplayAlert({
          displayed: true,
          message: "User updated successfuly",
          variant: "success",
        });
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
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    resetErrMsg();
  }, [displayAlert]);

  return (
    <>
      {is_admin ? (
        <>
          <NavBar />
          <Container>
            <Row className='mt-4 mb-4'>
              <Col>
                <h1>Admin page</h1>
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
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>
                            <Button
                              onClick={() => handleUserDelete(user._id)}
                              className='mx-1'
                              variant='light'
                            >
                              Delete user
                            </Button>
                            <Button
                              onClick={() => handleUserEditModal(index)}
                              className='mx-1'
                              variant='light'
                            >
                              Edit user
                            </Button>
                            <Button
                              onClick={() => {
                                handleBookEditModal(index);
                              }}
                              className='mx-1'
                              variant='light'
                            >
                              Edit user books
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

          <EditUserModal
            showUserEditModal={showUserEditModal}
            setshowUserEditModal={setshowUserEditModal}
            handleEditUserChange={handleEditUserChange}
            handleUserUpdate={handleUserUpdate}
            editedUser={editedUser}
          />
          <EditUserBooksModal
            books={books}
            users={users}
            setshowBookEditModal={setshowBookEditModal}
            editedUser={editedUser}
            handleBookEditModal={handleBookEditModal}
            handleBookSearch={handleBookSearch}
            handleBookSearchChange={handleBookSearchChange}
            handleAddBook={handleAddBook}
            matchingBooks={matchingBooks}
            searchBook={searchBook}
            showBookEditModal={showBookEditModal}
            searchBy={searchBy}
            handleSearchBy={handleSearchBy}
            handleBookRemove={handleBookRemove}
          />
        </>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default AdminPage;
