import { useState, useLayoutEffect, useEffect } from "react";
import User from "./User";
import AddForm from "./AddForm";
import { Col, Table, Button, Modal } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { Cookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import Pagination from "./Pagination";

const cookie = new Cookies();
const UserList = ({ token, userDetail }) => {
  const [users, setUsers] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //state where we determine how many data will appear on a page 
  const [userPerPage] = useState(5);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogOut = () => { //for user logout
    cookie.remove("access_token"); //remove token from browser
    window.location.reload(false); //refresh page
  };
  //We run this function without loading the page with useLayoutEffect
  useLayoutEffect(() => {
    (async function () {
      //take user list
      await axios
        .get(`${process.env.REACT_APP_UMM_SERVER}/users/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })//if process is successful
        .then((response) => {
          setUsers(response.data.data); 
          setIsLoading(false); 
        }) //process is unsuccessful
        .catch((error) => {
          //if status is 401
          if (error.response.status === 401) {
            cookie.remove("access_token");//remove token from browser
            window.location.reload(false);//refresh page
          }
          console.log(error);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isEdit, isDelete]);

  const indexOfLastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOfLastPost - userPerPage;
  useEffect(() => {
    //if loading process finished
    if (!isLoading) {
      //filter data and set currentUsers
      setCurrentUsers(users.slice(indexOfFirstPost, indexOfLastPost));
    }
    //if currentUsers length is equal the 0
    if (currentUsers.length - 1 === 0) {
      setCurrentPage(currentPage - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentPage, users]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //if datas is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Col className="usersTable mt-3" xl={8} lg={10} md={12} sm={12} xs={12}>
        <Col className="tableHead" xl={12} md={12} lg={12} sm={12} xs={12}>
          <h4>Manage Users</h4>
          <div>
            <Button variant="danger btnLogOut" onClick={handleLogOut}>
              Log Out
            </Button>
            <Button variant="success" onClick={handleShow}>
              <BsFillPlusCircleFill /> Add New User
            </Button>
          </div>
        </Col>
        <Col className="tableBody" xl={12} md={12} lg={12} sm={12} xs={12}>
          <Table striped hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <User
                    token={token}
                    user={user}
                    setIsEdit={setIsEdit}
                    setIsDelete={setIsDelete}
                    userDetail={userDetail}
                    cookie={cookie}
                  />
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <>
          <ToastContainer />
        </>
      </Col>
      <Pagination
        totalUsers={users.length}
        userPerPage={userPerPage}
        paginate={paginate}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {token && <AddForm token={token} setShow={setShow} cookie={cookie} />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
