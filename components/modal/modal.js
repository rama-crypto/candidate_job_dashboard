import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ form, formSubmit, children, title, openCloseModal }) => {
    return (
        <>
            <div className="modal-container" onClick={openCloseModal}>
                <div
                    className="modal-content custom-scrollbar"
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                >
                    <div className="heading">{title}</div>
                    {children ? (
                        children
                    ) : (
                        <div className="form">
                            <div className="custom-input-group-collection">
                                {form.map((child, index) => {
                                    if (Array.isArray(child)) {
                                        return (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    gap: '40px',
                                                    flexWrap: 'wrap',
                                                }}
                                                key={index}
                                            >
                                                {child.map((child1, index) => {
                                                    return (
                                                        <div
                                                            className="custom-input-group"
                                                            style={{
                                                                minWidth:
                                                                    '275px',
                                                                flex: '1',
                                                            }}
                                                            key={index}
                                                        >
                                                            <div className="custom-input-group-heading">
                                                                {child1.heading}
                                                            </div>
                                                            {child1.textarea ? (
                                                                <textarea />
                                                            ) : (
                                                                <input
                                                                    type={
                                                                        child1.input
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                    return (
                                        <div
                                            className="custom-input-group"
                                            key={index}
                                        >
                                            <div className="custom-input-group-heading">
                                                {child.heading}
                                            </div>
                                            {child.textarea ? (
                                                <textarea />
                                            ) : (
                                                <input type={child.input} />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="submit">
                                <div
                                    className="button"
                                    onClick={formSubmit.click}
                                >
                                    {formSubmit.title}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .modal-container {
                    position: fixed;
                    width: 100%;
                    z-index: 1;
                    top: 0px;
                    left: 0px;
                    min-height: 100vh;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modal-content {
                    max-height: 90vh;
                    overflow-y: auto;
                    max-width: 865px;
                    flex: 1;
                    margin: 0px 15px;
                    background: #ffffff;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
                    border-radius: 15px;
                }

                .modal-content .heading {
                    border-bottom: 3px solid rgba(70, 90, 197, 0.08);
                    font-weight: 600;
                    font-size: 35px;
                    line-height: 68px;
                    text-align: center;
                    padding: 15px 0px;
                }

                .modal-content .form {
                    padding: 82px 100px 47px;
                }

                .modal-content .form .submit {
                    margin-top: 20px;
                    text-align: right;
                }

                .modal-content .form .submit .button {
                    padding: 12px 44px;
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 36px;
                    background: #465ac5;
                    display: inline-block;
                    color: #fff;
                    border-radius: 10px;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default Modal
