import React from 'react'
import {Modal, Button} from "react-bootstrap"
import {toast} from "react-toastify"
import axios from 'axios'

const DeleteForm = ({user, token, deleteShow, setIsDelete, setDeleteShow}) => {

    

    const deleteHandleClose = () => {
      setIsDelete(false);
      setDeleteShow(false);
    };

  

    const deleteUser = async () => {
        await axios
          .delete(`${process.env.REACT_APP_UMM_SERVER}/users/${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setDeleteShow(false);
            setIsDelete(false);
            toast.success("Silme işlemi başarılı...");
          })
          .catch((error) => {
            toast.error("İşlem başarısız...");
          });
      };

    return (
        <>
            <Modal show={deleteShow} onHide={deleteHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>{user.username}</b> kullanıcısını silmek istiyor musunuz?
          </p>
          <Modal.Footer>
            <Button variant="secondary" onClick={deleteHandleClose}>
              Close
            </Button>
            <Button onClick={deleteUser}> Delete </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
        </>
    )
}

export default DeleteForm
