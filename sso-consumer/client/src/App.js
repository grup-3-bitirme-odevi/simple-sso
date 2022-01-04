import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import Card from "./Components/Card";

const cookies = new Cookies();

function App() {
  const [token, setToken] = useState("");
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const getCookie = cookies.get("access_token");
    const originURL = window.location.origin;

    if (!!getCookie) {
      (async function () {
        try {
          //get request for the validate
          await axios
            .get(`${process.env.REACT_APP_SSO_SERVER}/validate`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie}`,
              },
            })
            .then(() => {
              setToken(getCookie); 
              setAllow(true);
            })
            .catch((error) => {
              if (error.response.data.stat === "fail") {
                setAllow(false);
                cookies.remove("access_token"); //remove access_token from the browser
                window.location.assign(
                  `${process.env.REACT_APP_SSO_CLIENT}?redirectURL=${originURL}`
                ); //we redirect the user to the login screen to login again
              }
            });
        } catch (error) {
          console.log(error);
        }
      })();
    }
    //If the cookie is empty, we are redirect the user to the login screen.
    else {
      setAllow(false);
      window.location.assign(
        `${process.env.REACT_APP_SSO_CLIENT}?redirectURL=${originURL}` 
      );
    }
  }, []);

  return (
    <>
      {allow && (
        <div className="consumerContainer">
          {token && <Card token={token} />}
        </div>
      )}
    </>
  );
}

export default App;
