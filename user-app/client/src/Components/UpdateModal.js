import React,{useState,useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import { Cookies } from 'react-cookie';

const UpdateModal = ({ 
  updateshow,
  update_id,
  setupShow,
  updateData,}) => {


    const [updateCreate, setupdateCreate] = useState("");
    const cookies = new Cookies();


  const forCreateClose = () => setupShow(false);
  useEffect(() => {
    const getCookie = cookies.get("access_token");
    (async function (){ 
      await axios.put(`http://localhost:3200/users/${update_id}`,updateCreate,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie}`
        }}).then(()=>setupShow(false))
     })()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[updateCreate])


    return (
      <>
      <Modal size="lg" show={updateshow} onHide={forCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User {update_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ username:updateData.username!=='' ? updateData.username:'' ,
             user_name:updateData.user_name!=='' ? updateData.user_name:'', 
             user_surname: updateData.user_surname!=='' ? updateData.user_surname:'', 
             user_email: updateData.user_email!=='' ? updateData.user_email:'', 
             user_password: updateData.user_password!=='' ? updateData.user_password:'', 
             user_type:updateData.user_type!=='' ? updateData.user_type:'',}}
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
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setupdateCreate(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className="formElementContainer"  >
              <label>User Name</label>
              <Field
                type="text"
                name="username"
                placeholder="Kullanıcı Adınızı giriniz"
                className="modalInputs" />
                <p className="errorText"><ErrorMessage name="username" /></p>
              


              <label>Name</label>
              <Field
                type="text"
                name="user_name"
                placeholder="İsminizi giriniz"
                className="modalInputs" />
                <p className="errorText"><ErrorMessage name="user_name" /></p>
              

              <label>Surname</label>
              <Field
                type="text"
                name="user_surname"
                placeholder="Soyisminizi giriniz"
                className="modalInputs"

              />
              <p className="errorText"><ErrorMessage name="user_surname" /></p>
              

              <label>Email</label>
              <Field
                type="text"
                name="user_email"
                placeholder="Mail adresinizi giriniz"
                className="modalInputs"

              />
              <p className="errorText"><ErrorMessage name="user_email" /></p>
              

              <label>Password</label>
              <Field
                type="password"
                name="user_password"
                placeholder="Şifrenizi giriniz"
                className="modalInputs"

              />
              <p className="errorText"><ErrorMessage name="user_password" /></p>
              <label>User Role</label>
              <Field name="user_type" as="select" className="my-select modalDropDown">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Field>
              <p className="errorText"><ErrorMessage name="user_type" /></p>
              

              <Button className="modalButtons" variant="primary" type="submit" >
                Create
              </Button>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
    )
}

export default UpdateModal
