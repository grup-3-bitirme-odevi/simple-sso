import {useEffect, useState} from 'react';
import { Cookies } from 'react-cookie';
import axios from "axios";
import Card from './Components/Card';

const cookies = new Cookies();

function App() {
  const [token, setToken] = useState('');

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

  return (
    <>
    {token && 
      <div className="consumerContainer">
        { <Card token={token} /> }
      </div>
    }
    </>
    

  );
}

export default App;
