import React from 'react'
import {Col, Button} from "react-bootstrap"
import { IoAddCircle } from "react-icons/io5";
const TableHead = ({handleShow}) => {
    return (
        <>
            <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
          <h4>Manage Users</h4>
          <Button variant="success" onClick={handleShow}>
            {" "}
            <IoAddCircle className="addImage" /> Add New User
          </Button>
        </Col>
        </>
    )
}

export default TableHead
