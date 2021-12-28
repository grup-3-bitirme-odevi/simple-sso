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
  //bir sayfada kaç adet veri gözükeceğini belirlediğimiz state
  const [userPerPage] = useState(5);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogOut = () => {
    cookie.remove("access_token");
    window.location.reload(false);
  };

  useLayoutEffect(() => {
    (async function () {
      await axios
        .get(`${process.env.REACT_APP_UMM_SERVER}/users/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isEdit, isDelete]);

  const indexOfLastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOfLastPost - userPerPage;
  useEffect(() => {
    if (!isLoading) {
      setCurrentUsers(users.slice(indexOfFirstPost, indexOfLastPost));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentPage, show, users]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
          {token && <AddForm token={token} setShow={setShow} />}
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
