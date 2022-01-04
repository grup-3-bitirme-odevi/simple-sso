import "./assets/App.css";
import UserList from "./Components/UserList";
import Header from "./Components/Header";
import { useState, useEffect } from "react";

import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const App = () => {
  const [token, setToken] = useState("");
  const [allow, setAllow] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    //taking cookies from browser
    const getCookie = cookies.get("access_token");
    //taking url from browser
    const originURL = window.location.origin;
    
    //if cookie is not null
    if (!!getCookie) {
      (async function () {
        try {
          //check cookie on the sso server
          await axios
            .get(`${process.env.REACT_APP_SSO_SERVER}/validate`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie}`,
              },
            }) //if the cookie is ok
            .then(async (response) => {
              //set the cookie and get user data
              setToken(getCookie);
              getUserData(getCookie);
            }) //if cookie is not ok
            .catch((error) => {
              //if the response is fail
              if (error.response.data.stat === "fail") {
                //clear cookie
                cookies.remove("access_token");
                //get the url from the app and direct it to the sso server
                window.location.assign(`${process.env.REACT_APP_SSO_CLIENT}?redirectURL=${originURL}`);
              }
            });
        } catch (error) {
          console.log(error);
        }
      })();
    } else { //if cookie is null
      //get the url from the app and direct it to the sso server
      window.location.assign(`${process.env.REACT_APP_SSO_CLIENT}?redirectURL=${originURL}`);
    }
  }, []);

  const getUserData = async (getCookie) => {
    //taking url from browser
    const originURL = window.location.origin;
    //request user information from user manager module
    await axios
      .get(`${process.env.REACT_APP_UMM_SERVER}/users/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie}`,
        },
      }) //if the process is true
      .then((response) => {
        //if user role is not admin
        if (response.data.data.user_type !== "admin") {
          //not allow access to the page
          setAllow(false);
          //get the url from the app and direct it to the sso server
          window.location.assign(`${process.env.REACT_APP_SSO_CLIENT}?redirectURL=${originURL}`);
        } else {
          //allow access to the page
          setAllow(true);
          //giving user information to state
          setUserDetail(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {allow && (
        <div className="tablesContainer">
          {userDetail && <Header userDetail={userDetail} />}  {/* sending userDetail state to Header component */}
          {token && <UserList token={token} userDetail={userDetail} />} {/* sending token and userDetail states to UserList component */}
        </div>
      )}
    </>
  );
};

export default App;
