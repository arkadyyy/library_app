import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import RemoveTab from "./Tabs/RemoveTab/RemoveTab";
import AddTab from "./Tabs/AddTab/AddTab";

const EditUserBooksModal = ({
  books,
  users,
  editedUser,
  handleBookEditModal,
  handleBookSearch,
  handleBookSearchChange,
  handleAddBook,
  matchingBooks,
  searchBook,
  showBookEditModal,
  searchBy,
  handleSearchBy,
  handleBookRemove,
  setshowBookEditModal,
}) => {
  const [key, setKey] = useState("add");
  const [relevantBooks, setRelevantBooks] = useState([]);

  useEffect(() => {
    const filtered = books.filter((book) =>
      editedUser.my_books.includes(book._id)
    );

    setRelevantBooks(filtered);
  }, [editedUser, books, users]);

  return (
    <>
      <Modal
        show={showBookEditModal}
        onHide={() => setshowBookEditModal(false)}
        dialogClassName='fullscreen-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey='add' title='Add book'>
              <AddTab
                editedUser={editedUser}
                searchBook
                handleBookSearch={handleBookSearch}
                handleAddBook={handleAddBook}
                handleBookSearchChange={handleBookSearchChange}
                matchingBooks={matchingBooks}
                searchBy={searchBy}
                searchBook={searchBook}
                handleSearchBy={handleSearchBy}
              />
            </Tab>
            <Tab eventKey='remove' title='Remove book'>
              <RemoveTab
                editedUser={editedUser}
                handleBookRemove={handleBookRemove}
                relevantBooks={relevantBooks}
              />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditUserBooksModal;
