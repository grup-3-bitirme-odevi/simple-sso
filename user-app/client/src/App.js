import "./assets/App.css";
import UserList from './components/UserList';
import Header from './components/Header';
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const App = () => {

  const [token, setToken] = useState("");
  const [userDetail, setUserDetail] = useState({});
  
  
  useEffect(() => {
    const getCookie = cookies.get('access_token');
    const originURL = window.location.origin;
    
    if(!!getCookie){
      (async function(){
        try{
          await axios.get('http://localhost:3100/validate',{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookie}`
            }
          }).then(async (response) => {
            setToken(getCookie);
            getUserData(getCookie);
          }).catch((error) => {
            if(error.response.data.stat==='fail'){
              cookies.remove('access_token');
              window.location.assign('http://localhost:3010?redirectionURL='+originURL);
            }
          })
        } catch(error){
          console.log(error);
        }
      })();
    } else{
      window.location.assign('http://localhost:3010?redirectionURL='+originURL);
    }
  },[])

  const getUserData = async(getCookie) => {
    await axios.get('http://localhost:3200/users/info',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie}`
      }
    })
    .then((response) => setUserDetail(response.data.data))
    .catch((error) => console.log(error));
  }

  return (
    <>
    {userDetail && 
      <div className="App">
      <Container>
        <Row>
          <Header userDetail={userDetail} />
          {token && <UserList token={token} />}
        </Row>
      </Container>
      </div>
    }
    </>
  );
};

export default App;
