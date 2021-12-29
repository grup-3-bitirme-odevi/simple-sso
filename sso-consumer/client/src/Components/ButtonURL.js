import React from "react";
import { Button } from "react-bootstrap";

const ButtonURL = () => {
  return (
    <>
      <Button className="mt-2" href={process.env.REACT_APP_UMM_CLIENT}>
        Users Table
      </Button>
    </>
  );
};

export default ButtonURL;
