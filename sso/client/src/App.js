import { useState, useEffect } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

function App() {

  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salt="qwe123asd123zxc";
    await axios.post("http://localhost:3100/",{username:username,password:sha256(password+salt)});
  }

  useEffect(() => {
    const redirectQuery = window.location.search.split("=")[0];
    const redirectParam = window.location.search.split("=")[1]
    
    if(redirectQuery==="?redirectURL"){
      if(redirectParam !== "" && redirectParam !== null && redirectParam.length !== 0){
        (async function (){
          try{
            const response = await axios.post("http://localhost:3100/checkurl", {url: redirectParam});
            if(response.data.message==="success"){
              setRedirect(true);
            }
          } catch(err){
            console.log(err);
          }
        })();
      }
    }
    else{
      setRedirect(false);
    }
  },[]);
  
  return (
    <div className="App">
        {redirect &&
          <form onSubmit={handleSubmit}>
            <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="login" />
            <input type="text" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="password" /> 
            <button type="submit" > login </button>
          </form>
        }
        
    </div>
  );
}

export default App;
