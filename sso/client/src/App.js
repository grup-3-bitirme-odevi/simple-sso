import { useState } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';



function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salt="qwe123asd123zxc";
    const response = await axios.post("http://localhost:3010/",{username:username,password:sha256(password+salt)});
    console.log(response.data)

  }
  

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="login" />
          <input type="text" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="password" /> 
          <button type="submit" > login </button>
        </form>
    </div>
  );
}

export default App;
