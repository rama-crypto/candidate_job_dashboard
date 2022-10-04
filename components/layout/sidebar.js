import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import AuthContext from '../auth/AuthContext'
import Sidebarlink from '../sidebarlink'
import { MAINLINKS } from '../../constants/nav-links'

const Mainsidebar = () => {
    const router = useRouter()
    const { token, profile } = useContext(AuthContext)

    return (
        <>
            <nav>
                <div className="main-sidebar-wrapper d-flex flex-column">
                    <div className="w-100 d-flex flex-row">
                        <img
                            src="/portal_icon.png"
                            className="sidebar-icon"
                        />
                    </div>

                    <div className="tw-ml-16 tw-mr-15 mt-5">
                        {MAINLINKS.map((mainLink, index) => {
                            return <Sidebarlink key={index} {...mainLink} />
                        })}
                    </div>

                    <div className="mt-auto profile-wrapper">
                        <div className="d-flex flex-row align-items-center justify-content-around">
                            <div
                                className="d-flex flex-row align-items-center"
                                role={'button'}
                                onClick={(event) => {
                                    event.preventDefault()
                                    console.log('redirecting to profile page')
                                    router.push(`/profile/${profile?.username}`)
                                }}
                            >
                                <img
                                    src={profile.profile_picture}
                                    className="profile-icon"
                                />
                                <div className="ms-2">
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '15px',
                                            width: '135px',
                                        }}
                                        className="m-0 text-truncate"
                                    >
                                        {profile.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <style jsx>{`
                .main-sidebar-wrapper {
                    width: 280px;
                    height: 100vh;
                    overflow: hidden;
                    background-color: rgba(238, 239, 246, 1);
                    background-color: white;
                    position: fixed;
                    border-style: solid;
                    border-width: 0px 1px 0px 0px;
                    border-color: #e4e8f1;
                }
                .ml-per {
                    margin-left: 15%;
                }
                .unread-message {
                    top: 0px;
                    left: 50%;
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    background-color: green;
                }
                .profile-wrapper {
                    padding: 10px;
                    border-radius: 10px;
                    background-color: white;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
                    width: 230px;
                    margin-left: 25px;
                    margin-bottom: 75px;
                    margin-right: 25px;
                }
                .profile-icon {
                    height: 35px;
                    border-radius: 8px;
                }
            `}</style>
        </>
    )
}

export { Mainsidebar }
