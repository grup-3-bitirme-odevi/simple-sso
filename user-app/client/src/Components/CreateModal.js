import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Cookies } from 'react-cookie';

const CreateModal = ({ show, setShow }) => {

  /* Create User Datas */
  const [userCreate, setuserCreate] = useState("");
  const cookies = new Cookies();

  const forCreateClose = () => setShow(false);
  useEffect(() => {
    const getCookie = cookies.get("access_token");
    (async function () {
      await axios.post('http://localhost:3200/', userCreate, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie}`
        }
      })
        .then(response => {
          setShow(false);
        })
    })()
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCreate])


  console.log(userCreate)

  return (
    <>
      <Modal size="lg" show={show} onHide={forCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ username: '', user_name: '', user_surname: '', user_email: '', user_password: '',user_type:'' }}
            validationSchema={Yup.object({
              username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              user_name: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
              user_surname: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              user_email: Yup.string().email('Invalid email address').required('Required'),
              user_password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
              user_type:''

            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setuserCreate(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className="formElementContainer"  >
              <label>Kullanıcı Adı</label>
              <Field
                type="text"
                name="username"
                placeholder="Kullanıcı Adınızı giriniz" />
              <ErrorMessage name="username" />


              <label>İsim</label>
              <Field
                type="text"
                name="user_name"
                placeholder="İsminizi giriniz" />
              <ErrorMessage name="user_name" />

              <label>Soyisim</label>
              <Field
                type="text"
                name="user_surname"
                placeholder="Soyisminizi giriniz"

              />
              <ErrorMessage name="user_surname" />

              <label>Email</label>
              <Field
                type="text"
                name="user_email"
                placeholder="Mail adresinizi giriniz"

              />
              <ErrorMessage name="user_email" />

              <label>Şifre</label>
              <Field
                type="password"
                name="user_password"
                placeholder="Şifrenizi giriniz"

              />
              <ErrorMessage name="user_password" />
              <Field name="user_type" as="select" className="my-select">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Field>
              <ErrorMessage name="user_type" />
              <Button variant="primary" type="submit" >
                Create
              </Button>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateModal;
