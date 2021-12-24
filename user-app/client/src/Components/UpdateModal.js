import React from "react";
import { Modal, Form, Dropdown, Button } from "react-bootstrap";
import axios from 'axios'

const UpdateModal = ({ 
  users, 
  updateshow,
  setupShow,
  update_id,
  create,
  setCreate,

  updateUsername,
  updateName, 
  updateSurname, 
  updatePassword, 
  updateMail, 
  updateType, 

  setUpdateusername,
  setUpdatename,
  setUpdateSurname,
  setUpdatePassword,
  setUpdateMail,
  setUpdatetype,
  getscookie}) => {
  

  const forCreateClose = () => setupShow(false);
  const forUpdateUser = async () => {
    const article = {
      username: updateUsername,
      user_name: updateName,
      user_surname: updateSurname,
      user_password: updatePassword,
      user_email: updateMail,
      user_type: updateType
    }
    await axios.put(`http://localhost:3200/users/${update_id}`, article,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getscookie}`
      }})
      .then(response => {
        setupShow(false);
        setUpdateusername("");
        setUpdatename("")
        setUpdateSurname("")
        setUpdatePassword("")
        setUpdateMail("")
        setUpdatetype("")
      })


  };
    return (
        <>
        <Modal size="lg" show={updateshow} onHide={forCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User {update_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="formElementContainer" >
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kullanıcı Adınızı giriniz"
                value={updateUsername}
                onChange={(e) => {
                  setUpdateusername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="text"
                placeholder="İsminizi giriniz"
                value={updateName}
                onChange={(e) => setUpdatename(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Soyisim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Soyisminizi giriniz"
                value={updateSurname}
                onChange={(e) => setUpdateSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mail adresinizi giriniz"
                value={updateMail}
                onChange={(e) => setUpdateMail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifrenizi giriniz"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Rol</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {updateType === "" ? "Rolünüzü Seçiniz" : updateType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
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
            <Button variant="primary" type="submit" onClick={()=>{setCreate(create+1);forUpdateUser()}}>
              Update
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
        </>
    )
}

export default UpdateModal
