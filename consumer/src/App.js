import {useEffect, useState} from 'react';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

function App() {
  
  useEffect(() => {
    const token = cookies.get('tokenosss');
    const hostname = window.location.hostname;
    const href = window.location.href;
    console.log(hostname)
    console.log(href)



    if(!token){
      window.location.assign('http://localhost:3010?redirectURL=http://'+hostname+":"+href);
    } else {

    }

  })


  /*
    cookies.set('tokenosss','wqeREQWADaa3525256weTEWTGWEdqw21e',{path:'/'})
    console.log(cookies.get('tokenosss'))
  */
  return (
    <div className="App">
    </div>
  );
}

export default App;
