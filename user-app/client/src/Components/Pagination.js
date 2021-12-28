import React from "react";

const Pagination = ({ totalUsers, userPerPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav className="mt-5">
        <ul className="pagination">
          {pageNumbers.map((number, index) => (
            <li key={index} className="page-item">
              <a onClick={()=>paginate(number)} href="!#">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;