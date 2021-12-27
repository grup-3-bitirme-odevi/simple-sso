import React from 'react'

const ControlTxt = ({user}) => {
    return (
        <>
            <a href="http://localhost:3020/"><span>{`${user.username}`}<strong style={{fontSize:"14px"}}> (Current User)</strong></span></a>
        </>
    )
}

export default ControlTxt
