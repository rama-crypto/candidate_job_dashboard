import React from 'react'
import { AiOutlineCloudUpload, AiFillCamera } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'

const EditProfilePicture = () => {
    let fileUpload = (event) => {
        console.log(event.target.files)
    }
    return (
        <>
            <div className="edit-profile-pic-container">
                <div className="edit-profile-pic-content">
                    <div className="profile-pic">
                        <div className="file-input">
                            <label htmlFor="profile-pic">
                                <AiOutlineCloudUpload />
                            </label>
                            <input
                                type="file"
                                id="profile-pic"
                                onChange={fileUpload}
                                hidden
                            />
                        </div>
                    </div>
                    <div className="actions-save">
                        <div className="actions">
                            <div className="edit-action action">
                                <FiEdit2 />
                            </div>
                            <div className="camera-action action">
                                <AiFillCamera />
                            </div>
                            <div className="delete-action action">
                                <RiDeleteBin6Line />
                            </div>
                        </div>
                        <div className="save-button">Save</div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .edit-profile-pic-container {
                    padding: 0px 80px;
                }

                .edit-profile-pic-content {
                }

                .profile-pic {
                    text-align: center;
                }

                .actions-save {
                    margin: 40px 0px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .actions {
                    display: flex;
                    align-items: center;
                    gap: 22px;
                }

                .actions .action {
                    background: #edeffe;
                    border-radius: 10px;
                    padding: 10px;
                    font-size: 20px;
                    color: #465ac5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }

                .actions .delete-action {
                    color: #f15555;
                }

                .save-button {
                    padding: 8px 40px;
                    background: #465ac5;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 20px;
                    line-height: 36px;
                    cursor: pointer;
                    color: #fff;
                }

                .file-input label {
                    display: block;
                    font-size: 120px;
                    cursor: pointer;
                    cursor: pointer;
                }

                .file-input input {
                    display: none;
                }
            `}</style>
        </>
    )
}

export default EditProfilePicture
