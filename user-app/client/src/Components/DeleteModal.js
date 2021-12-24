import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({deleteShow, setDeleteShow, delete_id, setDelete_id, delete_name, create, setCreate}) => {
  const forDeleteClose = () => setDeleteShow(false);
  const forDeleteUser = async () => {
    await axios.delete(`http://localhost:3200/users/${delete_id}`);
  };
  return (
    <>
      <Modal size="lg" show={deleteShow} onHide={forDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{delete_name} kullanıcısını silmek istiyor musunuz?</p>
          <Modal.Footer>
            <Button variant="secondary" onClick={forDeleteClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                forDeleteUser();
                forDeleteClose();
                setCreate(create+1);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;
