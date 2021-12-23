import "./assets/App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateModal from "./Components/CreateModal";
import { Table, Col, Button } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { HiPencil } from "react-icons/hi";
import UpdateModal from "./Components/UpdateModal";
import DeleteModal from "./Components/DeleteModal"


const App = () => {
  const [users, setUsers] = useState();
  const [create,setCreate] = useState(0)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [updateshow, setupShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [update_id, setUpdate_id] = useState();
  const [delete_id, setDelete_id] = useState();
  const [delete_name, setDeletename] = useState();

  const [updateUsername, setUpdateusername] = useState();
  const [updateName, setUpdatename] = useState();
  const [updateSurname, setUpdateSurname] = useState();
  const [updatePassword, setUpdatePassword] = useState();
  const [updateMail, setUpdateMail] = useState();
  const [updateType, setUpdatetype] = useState();

  

  useEffect(() => {
    axios
      .get("http://localhost:3100/users")
      .then((data) => {
        setUsers(data.data);
        console.log(data)})
      .catch((err) => console.log(err));
  }, [create]);

  return (
    <Col className="tablesContainer" xl={12} md={12} lg={12} sm={12} xs={12}>
      <Col className="manageContainer" xl={8} md={8} lg={8} sm={8} xs={8}>
        <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
          <h4>Manage Employees</h4>
          <Button variant="success" onClick={handleShow}>
            {" "}
            <IoAddCircle className="addImage" /> Add New Employee
          </Button>
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
            {users === undefined
              ? undefined
              : users.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.user_name}</td>
                      <td>{data.user_surname}</td>
                      <td>{data.user_email}</td>
                      <td>{data.user_type}</td>
                      <td>
                        <HiPencil className="updateIcon"  onClick={function updateUser(){ 
                           setupShow(true);
                           setUpdate_id(data.id);
                           setUpdateusername(data.username);
                           setUpdatename(data.user_name);
                           setUpdateSurname(data.user_surname);
                           setUpdatePassword(data.user_password);
                           setUpdateMail(data.user_email);
                           setUpdatetype(data.user_type);
                        }} />
                        <IoMdTrash className="deleteIcon" onClick={function deleteUser(){ 
                          setDeleteShow(true);
                           setDelete_id(data.id);
                           setDeletename(data.username);
                           

                        }}  />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
        <CreateModal show={show} setShow={setShow} setCreate={setCreate} create={create}/>
        <UpdateModal 
        users={users} 
        updateshow={updateshow} 
        setCreate={setCreate} 
        create={create} 
        setupShow={setupShow} 
        update_id={update_id}
        updateUsername={updateUsername}
        updateName={updateName}
        updateSurname={updateSurname}
        updatePassword={updatePassword}
        updateMail={updateMail}
        updateType={updateType}
        setUpdateusername={setUpdateusername}
        setUpdatename={setUpdatename}
        setUpdateSurname={setUpdateSurname}
        setUpdatePassword={setUpdatePassword}
        setUpdateMail={setUpdateMail}
        setUpdatetype={setUpdatetype}
        />
        <DeleteModal 
        deleteShow={deleteShow} 
        setDeleteShow={setDeleteShow} 
        delete_id={delete_id} 
        setDelete_id={setDelete_id} 
        delete_name={delete_name} 
        create={create} 
        setCreate={setCreate} />

      </Col>
    </Col>
  );
};

export default App;
