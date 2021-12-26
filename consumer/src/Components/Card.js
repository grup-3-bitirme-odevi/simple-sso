import React from "react";
import { Col } from "react-bootstrap";
import defaultPP from "../assets/pics/defaultPP.jpg"

const Card = () => {
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
                <h6 >User Role <span className="userDataTxt">Admin</span></h6>
                
                <h6 >User Name <span className="userDataTxt">admin</span></h6>
                <h6 >Name <span className="userDataTxt">Oğuz</span></h6>
                <h6 >Surname <span className="userDataTxt">Özşen</span></h6>
                <h6 >Email <span className="userDataTxt">oguz@gmail.com</span></h6>
            </Col>
        </Col>
        <Col className="consumerFooter" xl={12} md={12} lg={12} sm={12} xs={12} >Created By KOOA</Col>
      </Col>
    </>
  );
};

export default Card;
