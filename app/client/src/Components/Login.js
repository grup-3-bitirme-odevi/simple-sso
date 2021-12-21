import React from "react";
import { Form, Button } from "react-bootstrap";
import "../style/Login.css"

const Login = () => {

  return (
    <div className="loginContainer">
      <div className="formContainer" >
          <Form className="formElementContainer">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Kullanıcı Adınız</Form.Label>
          <Form.Control type="name" placeholder="Kullanıcı Adınızı giriniz" />
          <Form.Text className="text-muted">
            E-posta adresinizi kimseler ile paylaşmayacağız.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Şifre</Form.Label>
          <Form.Control type="password" placeholder="Şifrenizi Giriniz" />
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
