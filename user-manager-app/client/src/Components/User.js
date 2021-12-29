import { useState } from "react";
import EditForm from "./EditForm";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
import ControlTxt from "./ControlTxt";
import DeleteForm from "./DeleteForm";

const User = ({ token, user, setIsEdit, setIsDelete, userDetail, cookie }) => {
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const editHandleClose = () => {
    setIsEdit(false);
    setEditShow(false);
  };
  const editHandleShow = () => {
    setIsEdit(true);
    setEditShow(true);
  };

  const deleteHandleShow = () => {
    setIsDelete(true);
    setDeleteShow(true);
  };

  return (
    <>
      <td>
        {user.username === userDetail.username ? (
          <ControlTxt user={user} />
        ) : (
          user.username
        )}
      </td>
      <td>{user.user_name}</td>
      <td>{user.user_surname}</td>
      <td>{user.user_email}</td>
      <td>{user.user_type}</td>
      <td>
        <BsPencilSquare onClick={editHandleShow} className="updateIcon" />
        <BsFillTrashFill onClick={deleteHandleShow} className="deleteIcon" />
      </td>
      <Modal show={editShow} onHide={editHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <EditForm
              token={token}
              user={user}
              setIsEdit={setIsEdit}
              setEditShow={setEditShow}
              cookie={cookie}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={editHandleClose} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteForm
        deleteShow={deleteShow}
        setIsDelete={setIsDelete}
        setDeleteShow={setDeleteShow}
        token={token}
        user={user}
        cookie={cookie}
      />
    </>
  );
};

export default User;
