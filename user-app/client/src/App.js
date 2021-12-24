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
import { Cookies } from 'react-cookie';
import Header from "./Components/Header";

const cookies = new Cookies();


const App = () => {
  const [views, setViews] = useState(false);
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
    const getCookie = cookies.get("access_token");
    const originURL = window.location.origin;

    if(getCookie !== undefined && getCookie !== null && getCookie !== ""){
      (async function(){
        try{
          await axios.post('http://localhost:3100/validate',{
            token: getCookie,
            url: originURL
          }).then(response => {
            if(response.data.stat==='success'){
              cookies.set('access_token',response.data.access_token);
              const getCookie = cookies.get("access_token");
              (async function(){
                await axios.get("http://localhost:3200/users", {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+getCookie
                  }
                })
                .then((data) => {
                  setUsers(data.data);
                  console.log(data)})
                .catch((err) => console.log(err));
              })();
            }
          }).catch(error => {
            if(error.response.data.stat==='fail'){
              cookies.remove("access_token");
              window.location.assign("http://localhost:3010?redirectURL="+ originURL)
            } 
          });
        } catch(err){
          console.log(err);
        }
      })();
      setViews(true);
    } else{
      window.location.assign("http://localhost:3010?redirectURL="+ originURL)
    }
  },[]);

  /*
  useEffect(() => {
    const getCookie = cookies.get("access_token");
      (async function(){
      await axios.get("http://localhost:3200/users", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+getCookie
        }
      })
      .then((data) => {
        setUsers(data.data);
        console.log(data)})
      .catch((err) => console.log(err));
    })();
  }, [create]);
*/
  return (
    <>
    {views && 
    <Col className="tablesContainer" xl={12} md={12} lg={12} sm={12} xs={12}>
      <Col xl={12} md={12} lg={12} sm={12} xs={12}>
        <Header/>
      </Col>
      <Col className="manageContainer" xl={8} md={8} lg={8} sm={8} xs={8}>
        <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
          <h4>Manage Users</h4>
          <Button variant="success" onClick={handleShow}>
            {" "}
            <IoAddCircle className="addImage" /> Add New User
          </Button>
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
        </Col>
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
    }
    </>
  );
};

export default App;
