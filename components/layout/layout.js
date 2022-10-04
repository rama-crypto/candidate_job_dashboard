import React from 'react'
import { Mainsidebar } from './sidebar'

const Desktoplayout = ({ children }) => {
    return (
        <>
            <Mainsidebar />
            <div className="d-flex flex-row">
                <div
                    className="desktop-app-wrapper flex-grow-1"
                    id="desktop-wrapper"
                >
                    {children}
                </div>
            </div>
            <style jsx>{`
                .desktop-app-wrapper {
                    margin-left: 280px;
                    height: 100vh;
                    background: white;
                    overflow-y: auto;
                    padding-top: 20px;
                }
            `}</style>
        </>
    )
}

export default Desktoplayout
