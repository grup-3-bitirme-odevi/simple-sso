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
          const isAuthorized = await axios.get('http://localhost:3010?redirectURL=' + originURL)
          console.log(isAuthorized)
          // window.location.assign("http://localhost:3010?redirectURL="+ originURL)
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
      {views && "hello"}
    </div>
  );
}

export default App;
