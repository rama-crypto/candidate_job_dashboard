import React from 'react'
import { useRouter } from 'next/router'

const Sidebarlink = ({ icon, title, to }) => {
    const router = useRouter()
    const { pathname } = router

    return (
        <>
            <div
                className={`d-flex flex-row align-items-center mb-4 user-select-none text-dark-blue h-purple ${
                    pathname.endsWith(to) && 'v-border'
                }`}
                role={'button'}
                onClick={() => {
                    router.push(to)
                }}
            >
                <div className="me-4">
                    <span className="">
                        {icon({
                            size: 22,
                            color: pathname.endsWith(to)
                                ? '#5a52b7'
                                : 'inherit',
                        })}
                    </span>
                </div>
                <p
                    className={`${
                        pathname === to ? 'fc-purple' : 'inherit'
                    } fw-bold mb-0`}
                >
                    {title}
                </p>
            </div>
            <style jsx>{`
                .text-dark-blue {
                    color: #808397;
                }
                .h-purple:hover {
                    color: #5a52b7;

                }
                .bc-purple:hover {
                    color: #5a52b7;
                }
                /* .right-border {
                    border: solid #5a52b7;
                    border-width: 0px 7px 0px 0px;
                } */
                .v-border{
                    position: relative;
                    border: none;
                    outline: none;
                }
                .v-border:after {
                        content: '';
                        height: 200%; 
                        width: 5px;

                        position: absolute;
                        right: 0;
                        top: 5; 

                        background-color: #5a52b7; /
}
            `}</style>
        </>
    )
}

export default Sidebarlink
