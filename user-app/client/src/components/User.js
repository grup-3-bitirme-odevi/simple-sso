import { useState } from 'react';
import EditForm from './EditForm';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
const User = ({user, setIsDelete, setDeleteID, setDeletedName}) => {

    const [editShow, setEditShow] = useState(false);

    const editHandleClose = () => setEditShow(false);
    const editHandleShow = () => setEditShow(true);

    const deleteHandleShow = () => setIsDelete(true);

    return(
        <>
                <td>{user.username}</td>
                <td>{user.user_name}</td>
                <td>{user.user_surname}</td>
                <td>{user.user_email}</td>
                <td>{user.user_type}</td>
                <td>
                    <BsPencilSquare onClick={editHandleShow} className="updateIcon" />
                    <BsFillTrashFill onClick={()=>{
                        deleteHandleShow();
                        setDeleteID(user.id);
                        setDeletedName(user.username);
                    }} className="deleteIcon" />
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
        </>
    )
}

export default User;