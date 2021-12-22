import { useState, useEffect } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { Cookies } from 'react-cookie';
import { Form, Button } from "react-bootstrap";
import "./assets/App.css"
const cookies = new Cookies();

function App() {

  const [redirect, setRedirect] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salt="qwe123asd123zxc";

    const response = await axios.post("http://localhost:3100/",{username:username,password:sha256(password+salt)});
    if (response.status === 200){
      cookies.set("access_token", response.data.access_token)
    }
  }
  // useEffect(()=>{
  //   const abc = "success"
  //   setData(abc);

  //   // window.location.assign("http://localhost:3030")
  // },[])
  // return(data)

  return (
    <div className="loginContainer">
        {redirect &&
      <div className="formContainer">
        <Form className="formElementContainer" onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Kullanıcı Adı</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Kullanıcı Adınızı giriniz"  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Şifrenizi Giriniz"  />
          </Form.Group>
          <Button type="submit">
            Giriş Yap
          </Button>
        </Form>
      </div>
        }
        
    </div>
  );
}

export default App;
