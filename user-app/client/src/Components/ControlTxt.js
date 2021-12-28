import React from 'react'

const ControlTxt = ({user}) => {
    return (
        <>
            <a href={`${process.env.REACT_APP_CON_CLIENT}`}><span>{`${user.username}`}<strong style={{fontSize:"14px"}}> (Current User)</strong></span></a>
        </>
    )
}

export default ControlTxt
