import React from "react";
import "../../assets/Tables.css"
import { Table, Col, Button } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import {HiPencil} from "react-icons/hi";

const Tables = () => {
    const users = [
        {
            "user_name":"oğuz",
            "user_mail":"oguz@gmail.com",
            "user_address":"İstanbul",
            "user_phone":"5649775412"
        },{
            "user_name":"anılcan",
            "user_mail":"anılcan@gmail.com",
            "user_address":"İstanbul",
            "user_phone":"5468679475"
        },{
            "user_name":"ömer",
            "user_mail":"ömer@gmail.com",
            "user_address":"İstanbul",
            "user_phone":"5548612475"
        },{
            "user_name":"koray",
            "user_mail":"koray@gmail.com",
            "user_address":"İstanbul",
            "user_phone":"5521536987"
        }
    ]
  return (
    <Col className="tablesContainer" xl={12} md={12} lg={12} sm={12} xs={12} >
      <Col className="manageContainer" xl={8} md={8} lg={8} sm={8} xs={8}>
          <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
              <h4>Manage Employees</h4>
              <Button variant="success" > <IoAddCircle className="addImage"/> Add New Employee</Button>
          </Col>
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((data,index)=>{
                    return(
                        <tr>
              <td>{data.user_name}</td>
              <td>{data.user_mail}</td>
              <td>{data.user_address}</td>
              <td>{data.user_phone}</td>
              <td><HiPencil className="updateIcon"/><IoMdTrash className="deleteIcon"/></td>
            </tr>
                    )
                })
            }
          </tbody>
        </Table>
      </Col>
    </Col>
  );
};

export default Tables;
