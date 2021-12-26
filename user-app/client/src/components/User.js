import { useState, useEffect } from 'react';
import EditForm from './EditForm';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
const User = (user) => {

    console.log(user.user.username)
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const editHandleClose = () => setEditShow(false);
    const editHandleShow = () => setEditShow(true);

    const deleteHandleClose = () => setDeleteShow(false);
    const deleteHandleShow = () => setDeleteShow(true);

    return(
        <>
                <td>{user.user.username}</td>
                <td>{user.user.user_name}</td>
                <td>{user.user.user_surname}</td>
                <td>{user.user.user_email}</td>
                <td>{user.user.user_type}</td>
                <td>
                    <BsPencilSquare onClick={editHandleShow} className="updateIcon" />
                    <BsFillTrashFill onClick={deleteHandleShow} className="deleteIcon" />
                </td>

            <Modal show={editShow} onHide={editHandleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={editHandleClose} variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={deleteShow} onHide={deleteHandleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete User </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>xxx kullanıcısını silmek istiyor musunuz?</p>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteHandleClose}>
                    Close
                    </Button>
                    <Button> Delete </Button>
                </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default User;