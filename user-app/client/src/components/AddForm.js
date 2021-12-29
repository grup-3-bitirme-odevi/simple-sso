import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AddForm = ({ token, setShow, cookie }) => {
  const [userCreate, setUserCreate] = useState();

  useEffect(() => {
    if (!!userCreate) {
      (async function () {
        await axios
          .post(`${process.env.REACT_APP_UMM_SERVER}/users`, userCreate, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.stat === "success") {
              toast.success("Kullanıcı Oluşturuldu.");
              setShow(false);
            }
          })
          .catch((error) => {
            if(error.response.status === 401){
              cookie.remove("access_token");
              window.location.reload(false);
            }
            toast.error("Kullanıcı Oluşturulamadı.");
          });
      })();
    }
  }, [userCreate]);

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          user_name: "",
          user_surname: "",
          user_email: "",
          user_password: "",
          user_type: "User",
          pass_hash: true,
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          user_name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          user_surname: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          user_email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          user_password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setUserCreate(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="formElementContainer">
          <label>User Name</label>
          <Field
            type="text"
            name="username"
            placeholder="Kullanıcı Adınızı giriniz"
            className="modalInputs"
          />

          <p className="errorText">
            <ErrorMessage name="username" />
          </p>

          <label>Name</label>
          <Field
            type="text"
            name="user_name"
            placeholder="İsminizi giriniz"
            className="modalInputs"
          />

          <p className="errorText">
            <ErrorMessage name="user_name" />
          </p>

          <label>Surname</label>
          <Field
            type="text"
            name="user_surname"
            placeholder="Soyisminizi giriniz"
            className="modalInputs"
          />
          <p className="errorText">
            <ErrorMessage name="user_surname" />
          </p>

          <label>Email</label>
          <Field
            type="text"
            name="user_email"
            placeholder="Mail adresinizi giriniz"
            className="modalInputs"
          />
          <p className="errorText">
            <ErrorMessage name="user_email" />
          </p>

          <label>Password</label>
          <Field
            type="password"
            name="user_password"
            placeholder="Şifrenizi giriniz"
            className="modalInputs"
          />
          <p className="errorText">
            <ErrorMessage name="user_password" />
          </p>
          <label>User Role</label>
          <Field
            name="user_type"
            as="select"
            className="my-select modalDropDown"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </Field>
          <p className="errorText">
            <ErrorMessage name="user_type" />
          </p>

          <Button className="modalButtons" variant="primary" type="submit">
            Create User
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AddForm;
