import "./assets/App.css"
import { useState, useEffect } from 'react';
import axios from "axios"
import { Table, Col, Button } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import {HiPencil} from "react-icons/hi";

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
     axios.get('http://localhost:3100/users').then((data)=>{setUsers(data.data) })
    
  }, [])
  console.log(users)


  
 

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
              <th>Surname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((data,index)=>{
                    return(
                        <tr>
              <td>{data.user_name}</td>
              <td>{data.user_surname}</td>
              <td>{data.user_email}</td>
              <td>{data.user_type}</td>
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

export default App;
