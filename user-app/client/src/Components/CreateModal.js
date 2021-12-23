import React, { useState } from "react";
import { Modal, Form, Dropdown, Button } from "react-bootstrap";
import axios from "axios";

const CreateModal = ({ show, setShow,setCreate,create}) => {
  /* Create User Datas */
  const [username, setUsername] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [user_surname, setUser_Surname] = useState("");
  const [user_password, setUser_Password] = useState("");
  const [user_email, setUser_Mail] = useState("");
  const [user_type, setUser_Type] = useState("");
  const [selectRole, setSelectRole] = useState("");



  const forCreateClose = () => setShow(false);
  const forCreateUser = async () => {
    const article = {
      username: username,
      user_name: user_name,
      user_surname: user_surname,
      user_password: user_password,
      user_email: user_email,
      user_type: user_type
    }
    await axios.post('http://localhost:3100/', article)
      .then(response => {
        setShow(false);
        setUsername("");
        setUser_Name("")
        setUser_Surname("")
        setUser_Password("")
        setUser_Mail("")
        setUser_Type("")
        setSelectRole("")
      })


  };


  return (
    <>
      <Modal size="lg" show={show} onHide={forCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="formElementContainer" >
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kullanıcı Adınızı giriniz"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="text"
                placeholder="İsminizi giriniz"
                value={user_name}
                onChange={(e) => setUser_Name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Soyisim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Soyisminizi giriniz"
                value={user_surname}
                onChange={(e) => setUser_Surname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mail adresinizi giriniz"
                value={user_email}
                onChange={(e) => setUser_Mail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifrenizi giriniz"
                value={user_password}
                onChange={(e) => setUser_Password(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Rol</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectRole === "" ? "Rolünüzü Seçiniz" : selectRole}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setUser_Type("Admin");
                      setSelectRole("Admin");
                    }}
                  >
                    Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={forCreateClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={()=>{setCreate(create+1);forCreateUser()}}>
              Create
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateModal;
