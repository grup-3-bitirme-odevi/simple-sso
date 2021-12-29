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

    let redURL = window.location.search;
    redURL = redURL.replace("?redirectURL=", '');
    await axios.post(`${process.env.REACT_APP_SSO_SERVER}?redirectURL=${redURL}`,{
      username:username,
      password:sha256(password+process.env.REACT_APP_PASS_SALT),
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
    let redURL = window.location.search;
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
  },[])

  if(!redirect){
    return(
      <div className='loginContainer  noRedirectLogin'>
        <h5 className='noRedirectHead'>Hangi sayfaya gitmek istiyorsunuz?</h5>
        <div className='mt-5'>
        <Button className='noRedirectBtn' href='http://localhost:3020'>User Detail</Button>
        <Button className='noRedirectBtn' href='http://localhost:3030'>User Manage Table</Button>
        </div>
      </div>
    )
  }

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
