import React from 'react'
import {Modal, Button} from "react-bootstrap"
import {Cookies} from "react-cookie"
import axios from 'axios';

const DeleteForm = ({isDelete, setIsDelete, deleteID, deletedName}) => {
    const cookies = new Cookies();
    
  const forDeleteUser = async () => {
    const getCookie = cookies.get("access_token");
    await axios.delete(`http://localhost:3200/users/${deleteID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie}`,
      },
    }).then((response)=>{setIsDelete(false)}).catch(err => console.log(err));
  };

    return (
        <>
            <Modal show={isDelete} onHide={()=>setIsDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{deletedName} kullanıcısını silmek istiyor musunuz?</p>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setIsDelete(false)}>
              Close
            </Button>
            <Button onClick={
                forDeleteUser}> Delete </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
        </>
    )
}

export default DeleteForm
