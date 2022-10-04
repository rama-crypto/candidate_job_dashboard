import React, { useEffect, useContext } from 'react'
import ReactModal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'

import AuthContext from '../auth/AuthContext'
import Roundimage from '../roundimage'

import { BiArrowBack } from 'react-icons/bi'

const Customreactmodal = ({
    isOpen,
    setCloseModal,
    modalHeading = 'Delete Post?',
    showProfileBar = false,
    children,
    dontClose,
    closeTimeOut = 0,
    height = '40vh',
    footerChildren = null,
    handleOnModalBackClick = () => {},
    showBackButton = false,
    showCloseButton = true,
}) => {
    const { profile } = useContext(AuthContext)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => (document.body.style.overflow = 'unset')
    }, [])

    return (
        <ReactModal
            isOpen={isOpen}
            closeTimeoutMS={closeTimeOut}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: '3',
                },
                content: {
                    height: 'auto',
                    width: '680px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                },
            }}
        >
            {/* pe-2 class is to give space between content-wrapper's scrollbar and right side of the modal-content-wrapper */}
            <div className="modal-content-wrapper pb-2 pe-2 ps-2">
                <div className="d-flex justify-content-center position-relative pt-4 pb-1 bottom-outline">
                    {Boolean(showBackButton) && (
                        <span
                            className="modal-back-btn modal-state-btn d-flex justify-content-center align-items-center"
                            role={'button'}
                            disabled={dontClose}
                            onClick={(event) => {
                                event.preventDefault()
                                handleOnModalBackClick()
                            }}
                        >
                            <BiArrowBack color="#626F79" size={20} />
                        </span>
                    )}
                    <h4 className="modal-heading">{modalHeading}</h4>
                    {Boolean(showCloseButton) && (
                        <span
                            className="modal-close-btn modal-state-btn d-flex justify-content-center align-items-center"
                            role={'button'}
                            disabled={dontClose}
                            onClick={(event) => {
                                event.preventDefault()
                                console.log('close modal button pressed')
                                setCloseModal(false)
                            }}
                        >
                            <AiOutlineClose size={18} color="black" />
                        </span>
                    )}
                </div>
                {showProfileBar && (
                    <div className="profile-wrapper position-relative ms-3">
                        <div className="avatar-wrapper">
                            <Roundimage
                                imageUrl={profile.profile_picture}
                                size={13}
                            />
                        </div>
                        <div className="d-flex flex-column name-interest-wrapper mt-2 mb-2">
                            <p className="m-0 name">{profile.name}</p>
                            <p className="m-0 interest"></p>
                        </div>
                    </div>
                )}
                <div className="custom-scrollbar content-wrapper mt-2 mb-4">
                    {children}
                </div>
                <div className="footer-wrapper">{footerChildren}</div>
            </div>
            <style jsx>{`
                .modal-content-wrapper {
                    background-color: white;
                    border-radius: 8px;
                }
                .bottom-outline {
                    border-style: solid;
                    border-width: 0px 0px 1px 0px;
                    border-color: #ebebeb;
                }
                .modal-heading {
                    font-weight: 600;
                    color: black;
                    font-size: 22px;
                }
                .modal-close-btn {
                    position: absolute;
                    top: 18px;
                    right: 20px;
                    zindex: 2;
                }
                .modal-back-btn {
                    position: absolute;
                    top: 18px;
                    left: 20px;
                    zindex: 2;
                }
                .modal-state-btn {
                    border-radius: 50%;
                    padding: 5px;
                    width: 32px;
                    height: 32px;
                }
                .modal-state-btn:hover {
                    background: #ebebeb;
                }
                .modal-state-btn:hover {
                    padding: 5px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #ebebeb;
                }
                .profile-wrapper {
                    height: auto;
                }
                .avatar-wrapper {
                    position: absolute;
                    left: 15px;
                }
                .name-interest-wrapper {
                    margin-left: 78px;
                    margin-top: 5px;
                }
                .name {
                    font-weight: 600;
                    font-size: 16px;
                }
                .content-wrapper {
                    height: ${height};
                    overflow-y: auto;
                }
                .interest {
                    font-weight: 500;
                    font-size: 14px;
                    color: #c4c4c4;
                }
                .modal-btn {
                    width: 125px;
                    height: 40px;
                    font-size: 14px;
                }
                .cancel {
                    border-style: solid;
                    border-width: 1px;
                    border-color: #ebebeb;
                    outline: transparent;
                    background-color: transparent;
                }
                .delete {
                    background-color: #5a52b7;
                    border-color: transparent;
                    color: white;
                }
                .footer-wrapper {
                    display: ${footerChildren ? 'flex' : 'none'};
                    border-width: 1px 0px 0px 0px;
                    border-style: solid;
                    border-color: #dee0e5;
                }
            `}</style>
        </ReactModal>
    )
}

export default Customreactmodal
