import React from 'react'
import {Button} from "react-bootstrap"
import {Cookies} from "react-cookie"
const cookie = new Cookies();

const ButtonURL = () => {

    const handleLogOut = () => {
        cookie.remove("access_token");
        window.location.reload(false);
    };
    return (
        <>
            <Button className='mt-3' onClick={handleLogOut} variant="danger">Log Out</Button>
            <Button className='mt-2' href='http://localhost:3030/'>Users Table</Button>
        </>
    )
}

export default ButtonURL
