import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditUserModal = ({
  setshowUserEditModal,
  handleEditUserChange,
  handleUserUpdate,
  showUserEditModal,
  editedUser,
}) => {
  return (
    <>
      <Modal
        size='lg'
        show={showUserEditModal}
        onHide={() => setshowUserEditModal(false)}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUserUpdate(e)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleEditUserChange("firstName", e.target.value)
                }
                value={editedUser.firstName}
                type='text'
                placeholder='First name'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleEditUserChange("lastName", e.target.value)
                }
                value={editedUser.lastName}
                type='text'
                placeholder='Last name'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email </Form.Label>
              <Form.Control
                onChange={(e) => handleEditUserChange("email", e.target.value)}
                value={editedUser.email}
                type='email'
                placeholder='Email'
              />
            </Form.Group>
            <Button type='submit' variant='light'>
              Update User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditUserModal;
