import React from 'react'

// Use outside Layout
const Pageloader = () => {
    return (
        <>
            <div className="d-flex flex-row vh-100 justify-content-center align-items-center">
                <div>
                    <div className="spinner-border nav-blue" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .nav-blue {
                    color: #5a52b7;
                }
                .vh-40 {
                    height: 40vh;
                }
            `}</style>
        </>
    )
}

// Use inside Layout
const Sectionloader = ({ py = 0, color = '#5a52b7', size }) => {
    return (
        <>
            <div>
                <div
                    className={`d-flex flex-row justify-content-center align-items-center`}
                >
                    <div className={`py-${py}`}>
                        <div
                            className={`spinner-border loader-color ${
                                size ? 'loader-size' : ''
                            }`}
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .loader-size {
                    width: ${size}px;
                    height: ${size}px;
                }
                .loader-color {
                    color: ${color};
                }
            `}</style>
        </>
    )
}

export { Pageloader, Sectionloader }
