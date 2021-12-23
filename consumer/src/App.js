import {useEffect, useState} from 'react';
import { Cookies } from 'react-cookie';
import axios from "axios";
const cookies = new Cookies();

function App() {
  const [views, setViews] = useState(false);

  useEffect(()=>{
    const getCookie = cookies.get("access_token");
    const originURL = window.location.origin;
    if(getCookie !== undefined && getCookie !== null && getCookie !== ""){
      (async function(){
        try{
          const isAccessTokenValid = await axios.post('http://localhost:3100/validate',{
            token: getCookie,
            url: originURL
          });
          if(isAccessTokenValid.data.message==='fail'){
            cookies.remove("access_token");
            window.location.assign("http://localhost:3010?redirectURL="+ originURL)
          } else{
            cookies.set('access_token',isAccessTokenValid.data.access_token);
          }
          
        } catch(err){
          console.log(err);
        }
      })();
      setViews(true);
    } else{
      window.location.assign("http://localhost:3010?redirectURL="+ originURL)
    }
  },[])


  /*
    cookies.set('tokenosss','wqeREQWADaa3525256weTEWTGWEdqw21e',{path:'/'})
    console.log(cookies.get('tokenosss'))
  */
  return (
    <div className="App">
      {views && "consumer page"}
    </div>
  );
}

export default App;
