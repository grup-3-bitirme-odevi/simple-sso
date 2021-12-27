import { useState, useEffect } from "react";
import User from "./User";
import AddForm from "./AddForm";
import { Col, Table, Button, Modal } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";

const UserList = ({ token }) => {
  const [users, setUsers] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async function () {
      await axios
        .get("http://localhost:3200/users/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isEdit, isDelete]);

  return (
    <>
    <Col className="usersTable mt-3" xl={8} md={8} lg={8} sm={8} xs={8}>
      <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
        <h4>Manage Users</h4>
        <Button variant="success" onClick={handleShow}>
          <BsFillPlusCircleFill /> Add New User
        </Button>
      </Col>
      <Col className="tableBody" xl={12} md={12} lg={12} sm={12} xs={12}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <User
                    token={token}
                    user={user}
                    setIsEdit={setIsEdit}
                    setIsDelete={setIsDelete}
                  />
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
      </Col>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {token && <AddForm token={token} setShow={setShow} />}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default UserList;
