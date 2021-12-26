import {useEffect, useState} from 'react';
import { Cookies } from 'react-cookie';
import axios from "axios";
import Card from './Components/Card';


const cookies = new Cookies();

function App() {
  const [views, setViews] = useState(false);

  useEffect(()=>{
    const getCookie = cookies.get("access_token");
    const originURL = window.location.origin;
    if(getCookie !== undefined && getCookie !== null && getCookie !== ""){
      (async function(){
        try{
          await axios.post('http://localhost:3100/validate',{
            token: getCookie,
            url: originURL
          }).then(response => {
            if(response.data.stat==='success'){
              cookies.set('access_token',response.data.access_token);
            }
          }).catch(error => {
            if(error.response.data.stat==='fail'){
              cookies.remove("access_token");
              window.location.assign("http://localhost:3010?redirectURL="+ originURL)
            } 
          });
        } catch(err){
          console.log(err);
        }
      })();
      setViews(true);
    } else{
      window.location.assign("http://localhost:3010?redirectURL="+ originURL)
    }
  },[])

  return (
    <div className="consumerContainer">
      {views && <Card/>}
    </div>
  );
}

export default App;
