import { useState } from 'react';
import EditForm from './EditForm';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
const User = ({user, setIsDelete, setDeleteID, setDeletedName, token, setIsEdit}) => {

    const [editShow, setEditShow] = useState(false);

    const editHandleClose = () => {
        setIsEdit(false);
        setEditShow(false);
    }
    const editHandleShow = () => {
        setIsEdit(true);
        setEditShow(true);
    }

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
                {user && <EditForm token={token} user={user} setIsEdit={setIsEdit} setEditShow={setEditShow}/>}
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