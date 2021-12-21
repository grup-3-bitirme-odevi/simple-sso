import React from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/Login.css";

const Login = () => {

  function handleInput(event){
    event.preventDefault();
    const target = event.target;
    console.log(target.value);
  }

  return (
    <div className="loginContainer">
      <div className="formContainer">
        <Form className="formElementContainer" >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Kullanıcı Adı</Form.Label>
            <Form.Control type="name" placeholder="Kullanıcı Adınızı giriniz" onChange={handleInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="password" placeholder="Şifrenizi Giriniz" onChange={handleInput} />
          </Form.Group>
          <Button variant="success" type="submit">
            Giriş Yap
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
