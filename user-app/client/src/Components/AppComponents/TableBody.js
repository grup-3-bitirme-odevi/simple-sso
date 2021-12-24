import React from 'react'
import {Col, Table} from "react-bootstrap"
import { HiPencil } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";

const TableBody = ({users, setupShow,
    setUpdate_id,
    setUpdateData,
    setDeleteShow,
    setDelete_id,
    setDeletename}) => {
    return (
        <>
            <Col className="tableBody" xl={12} md={12} lg={12} sm={12} xs={12}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users === undefined
              ? undefined
              : users.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.user_name}</td>
                      <td>{data.user_surname}</td>
                      <td>{data.user_email}</td>
                      <td>{data.user_type}</td>
                      <td>
                        <HiPencil className="updateIcon"  onClick={function updateUser(){ 
                           setupShow(true);
                           setUpdate_id(data.id);
                           setUpdateData(data)
                        }} />
                        <IoMdTrash className="deleteIcon" onClick={function deleteUser(){ 
                          setDeleteShow(true);
                           setDelete_id(data.id);
                           setDeletename(data.username);
                           

                        }}  />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
        </Col>
        </>
    )
}

export default TableBody
