import React from 'react'

import Roundimage from './roundimage'

const Profilebar = ({ profilePicture, name, interest, linkToBio }) => {
    return (
        <>
            <div className="d-flex align-items-center ps-4">
                <div className="me-4">
                    <Roundimage imageUrl={profilePicture} size={48} />
                </div>
                <div className="d-flex flex-column">
                    <p className="m-0 name">{name}</p>
                    <p className="m-0 interest">{interest}</p>
                </div>
            </div>
            <style jsx>{`
                .name {
                    color: black;
                    font-size: 16px;
                    font-weight: bold;
                }
                .interest {
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 22px;
                    color: rgb(196, 196, 196);
                    margin-bottom: 0px;
                }
            `}</style>
        </>
    )
}

export default Profilebar
