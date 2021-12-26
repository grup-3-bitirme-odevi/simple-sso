import { useState, useEffect } from 'react';
import User from './User';
import AddForm from './AddForm';
import { Col, Table, Button, Modal } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

const UserList = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
            <h4>Manage Users</h4>
            <Button variant="success" onClick={handleShow} ><BsFillPlusCircleFill/> Add New User</Button>
        </Col>
        <Col className="tableBody" xl={12} md={12} lg={12} sm={12} xs={12}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <User />
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddForm />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
					Close
				</Button>
            </Modal.Footer>
        </Modal>

        </Col>
        </>       
    )
}

export default UserList;