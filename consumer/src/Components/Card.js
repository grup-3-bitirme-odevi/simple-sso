import { useState, useEffect } from 'react';
import { Col } from "react-bootstrap";
import defaultPP from "../assets/pics/defaultPP.jpg"
import axios from "axios";

const Card = ({token}) => {
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    (async function(){
      await axios.get('http://localhost:3200/users/info',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => setUserDetail(response.data.data))
      .catch((error) => console.log(error));
    })();
  },[])

  return (
    <>
      <Col className="consumerCard" xl={3} md={3} lg={3} sm={3} xs={3}>
        <Col className="consumerHeader" xl={12} md={12} lg={12} sm={12} xs={12}>
          <Col className="consumerHeadBg" xl={12} md={12} lg={12} sm={12} xs={12}/>
          <Col className="consumerPhoto">
              <img className="consumerPP" src={defaultPP} alt="ConsumerPhoto"></img>
          </Col>
        </Col>
        <Col className="consumerContent" xl={11} md={11} lg={11} sm={11} xs={11}>
            <Col className="consumerBody" xl={12} md={12} lg={12} sm={12} xs={12}>
                <h6 >User Role <span className="userDataTxt">{userDetail.user_type}</span></h6>
                <h6 >Username <span className="userDataTxt">{userDetail.username}</span></h6>
                <h6 >Name <span className="userDataTxt">{userDetail.user_name}</span></h6>
                <h6 >Surname <span className="userDataTxt">{userDetail.user_surname}</span></h6>
                <h6 >Email <span className="userDataTxt">{userDetail.user_email}</span></h6>
            </Col>
        </Col>
        <Col className="consumerFooter" xl={12} md={12} lg={12} sm={12} xs={12} >Created By KOOA</Col>
      </Col>
    </>
  );
};

export default Card;
