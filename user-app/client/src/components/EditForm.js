import { Button} from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditForm = () => {

    return(
        <>
        <Formik
            /*initialValues={{ username:updateData.username!=='' ? updateData.username:'' ,
             user_name:updateData.user_name!=='' ? updateData.user_name:'', 
             user_surname: updateData.user_surname!=='' ? updateData.user_surname:'', 
             user_email: updateData.user_email!=='' ? updateData.user_email:'', 
             user_password: updateData.user_password!=='' ? updateData.user_password:'', 
             user_type:updateData.user_type!=='' ? updateData.user_type:'',}}*/
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
        </>
    )
}

export default EditForm;