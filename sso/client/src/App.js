import { useState, useEffect } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { Cookies } from 'react-cookie';
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import "./assets/App.css"
const cookies = new Cookies();

function App() {

  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const notify = (args) => {
    const data = args.data;
    console.log(data);
    if (data.stat === 'success') {
        toast.success(data.message)
    } else if (data.stat === 'fail') {
        toast.error(data.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salt="qwe123asd123zxc";
    var redURL = window.location.search;
    redURL = redURL.replace("?redirectURL=", '');
    await axios.post(`http://localhost:3100?redirectURL=${redURL}`,{
      username:username,
      password:sha256(password+salt),
      pass_hash: false
    }).then(response => {
      if(response.data.stat === 'success'){
        notify(response)
        cookies.set("access_token", response.data.access_token)
        window.location.assign(redURL);
      }
    }).catch(error => {
      notify(error.response)
    });
  }

  useEffect(() => {
    const getCookie = cookies.get("access_token"); 
    if(!!getCookie){
      window.location.assign('http://localhost:3020');
    } else{
      var redURL = window.location.search;
      redURL = redURL.replace("?redirectURL=", '');
      const redirectQuery = window.location.search.split("=")[0];
  
      if(redirectQuery==="?redirectURL"){
        if(!!redURL){
          setRedirect(true);
        }
      }
      else{
        setRedirect(false);
      }
    }
  },[])

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
          <Button type="submit" className='loginBtn' >
            Giriş Yap
          </Button>
          <ToastContainer />
        </Form>
      </div>
        }
        
    </div>
  );
}

export default App;
