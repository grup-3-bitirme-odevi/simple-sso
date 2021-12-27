import "./assets/App.css";
import UserList from './components/UserList';
import Header from './components/Header';
import { useState, useEffect } from "react";

import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const App = () => {

  const [token, setToken] = useState("");
  const [allow, setAllow] = useState(false);
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
            console.log(window.location)
            setToken(getCookie);
            getUserData(getCookie);
          }).catch((error) => {
            if(error.response.data.stat==='fail'){
              cookies.remove('access_token');
              window.location.assign('http://localhost:3010?redirectURL='+originURL);
            }
          })
        } catch(error){
          console.log(error);
        }
      })();
    } else{
      window.location.assign('http://localhost:3010?redirectURL='+originURL);
    }
  },[])

  const getUserData = async(getCookie) => {
    await axios.get('http://localhost:3200/users/info',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie}`
      }
    })
    .then((response) => {
      if(response.data.data.user_type!=='admin'){
        setAllow(false);
        window.location.assign('http://localhost:3020');
      } else{
        setAllow(true);
        setUserDetail(response.data.data)
      }
    })
    .catch((error) => console.log(error));
  }

  return (
    <>
    {allow && 
      <div className="tablesContainer">
          {userDetail && <Header userDetail={userDetail} />}
          {token && <UserList token={token} userDetail={userDetail} />}
      </div>
    }
    </>
  );
};

export default App;
