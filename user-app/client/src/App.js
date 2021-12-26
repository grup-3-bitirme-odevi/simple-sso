import "./assets/App.css";
import UserList from './Components/UserList';
import Header from './Components/Header';
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const App = () => {
  
  return (
    <div className="App">
    <Container>
      <Row>
        <Header />
        <UserList />
      </Row>
    </Container>
    </div>
  );
};

export default App;
