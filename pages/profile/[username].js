import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext, useMemo } from 'react'
import { BsDot } from 'react-icons/bs'

import SOCIALMEDIALINKS from '../../constants/social_links'
import TAGS from '../../constants/interest_tags'

import { AiOutlinePoweroff } from 'react-icons/ai'

import Tag from '../../components/interesttag'
import Desktoplayout from '../../components/layout/layout'
import AuthContext from '../../components/auth/AuthContext'
import Roundimage from '../../components/roundimage'
import { ProfileApi } from '../../api/profile'
import Onboardingmodal from '../../components/modal/onboardingmodal'
import { Sectionloader } from '../../components/loader'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'

const Sociallink = ({ link, icon, size }) => {
    return (
        <>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
            >
                <span>{icon({ size: size, color: 'black' })}</span>
            </a>
        </>
    )
}

const Profile = () => {
    const router = useRouter()

    const { username } = router.query
    const { token, profile } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)

    const [userProfile, setuserProfile] = useState({})

    const [showProfileEditModal, setShowProfileEditModal] = useState(false)

    const defaultValuesEditModal = {
        selectedColor: userProfile?.color || '',
        highlight: userProfile?.tagline || '',
        aboutMe: userProfile?.bio || '',
        interests: userProfile?.tags?.map((tag) => tag?.id) || [],
    }

    const profileApi = useMemo(() => {
        return new ProfileApi(token)
    }, [token])

    const logOutUser = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    const handleProfileEditModalSave = async ({
        newSelectedColor,
        newHighlight,
        newAboutMe,
        newInterests,
        allTags,
    }) => {
        console.log(newInterests, 'wkjlrnvkewrblge')
        try {
            console.log('wekogvnwklegvweokgvmwoekmg')
            const response = await profileApi.updateProfile(
                newSelectedColor,
                newHighlight,
                newAboutMe
            )
            const interestAddResp = await profileApi.addProfileTags(
                newInterests
            )
            console.log('added interests succesfull', interestAddResp)
            // console.log('erkjbnkjerbijrehnjgvbijergvbjkfrbvhjfrbvkjrfbvkjfrbvkjebvdkfbkb ,dfx mndf nm,dfvnj xbjhgfbv nmdfb vmcds/v,msdv m,ds vnmdf nmdf nm')
            console.log('succesfully updated the modal', response)
            setShowProfileEditModal(false)
        } catch (err) {
            console.log('error while editing profile modal', err)
            toast('Oops! Please try again!')
        }

        setuserProfile((prev) => {
            let tagObjects = []

            for (let item of newInterests) {
                for (let tag of allTags) {
                    if (item === tag.id) {
                        tagObjects.push(tag)
                    }
                }
            }

            return {
                ...prev,
                color: newSelectedColor,
                tagline: newHighlight,
                bio: newAboutMe,
                tags: tagObjects,
            }
        })
    }

    useEffect(async () => {
        if (router.isReady) {
            try {
                let profile = await profileApi.getProfile(username)
                let followers = await profileApi.getFollowerCount(username)
                console.log('profile fetched succesfully', profile, followers)
                profile = {
                    ...profile,
                    ...followers,
                }
                setuserProfile(profile)

                setLoading(false)
            } catch (err) {
                console.log(
                    'error while fetching profile through username',
                    username
                )
            }
        }
    }, [router.isReady, username])

    return (
        <Desktoplayout>
            <Onboardingmodal
                isOpen={showProfileEditModal}
                setShowOnboardModal={setShowProfileEditModal}
                token={token}
                editProfileModal={true}
                defaultValues={defaultValuesEditModal}
                handleProfileEditModalSave={handleProfileEditModalSave}
            />
            <div className="profile-page-wrapper mt-4 mb-4">
                {loading ? (
                    <Sectionloader py={5} />
                ) : (
                    <>
                        <div className="profile-banner position-relative">
                            <div className="profile-pic-wrapper position-absolute">
                                <Roundimage
                                    imageUrl={
                                        userProfile?.profile_picture
                                        // 'https://i.pinimg.com/736x/0a/53/c3/0a53c3bbe2f56a1ddac34ea04a26be98.jpg'
                                    }
                                    size={124}
                                    whiteBorder
                                    borderSize={6}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column pt-3 pb-3 pe-3 start-padding">
                            <div
                                className="d-flex justify-content-end"
                                style={{ height: '40px' }}
                            >
                                <button
                                    className="profile-btn follow-btn tw-flex tw-items-center tw-justify-center"
                                    style={{
                                        display:
                                            profile?.username !== username
                                                ? 'flex'
                                                : 'none',
                                    }}
                                >
                                    Follow
                                </button>
                                <button
                                    className="ms-4 profile-btn message-btn"
                                    style={{
                                        display:
                                            profile?.username !== username
                                                ? 'block'
                                                : 'none',
                                    }}
                                >
                                    Message
                                </button>
                                <button
                                    className="ms-4 profile-btn follow-btn"
                                    style={{
                                        display:
                                            profile?.username === username
                                                ? 'block'
                                                : 'none',
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        console.log(defaultValuesEditModal)
                                        setShowProfileEditModal(true)
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="ms-4 profile-btn logout-btn"
                                    style={{
                                        minWidth: '45px',
                                        display:
                                            profile?.username === username
                                                ? 'block'
                                                : 'none',
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        setShowProfileEditModal(true)
                                    }}
                                >
                                    <span
                                        className="d-flex align-items-center justify-content-center w-100 h-100"
                                        role={'button'}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            logOutUser()
                                        }}
                                    >
                                        <AiOutlinePoweroff color="red" />
                                    </span>
                                </button>
                            </div>
                            <div className="d-flex tw-self-start tw-items-start tw-flex-col pb-2">
                                <p className="profile-name m-0 pb-2">
                                    {userProfile?.name}
                                </p>
                                <p className="tw-text-sm tw-text-grey-400">
                                    {userProfile?.tagline}
                                </p>
                            </div>

                            <div className="following-wrapper pb-3">
                                <span className="num-description">
                                    <span className="num">
                                        {' '}
                                        {userProfile?.followers}{' '}
                                    </span>
                                    Followers
                                    <BsDot size={16} color={'#999FAB'} />
                                    <span className="num">
                                        {' '}
                                        {userProfile?.following}{' '}
                                    </span>
                                    Following
                                </span>

                                {/* <div className="tw-relative">
                                    <button onClick={() => { setShowDropDown(!showDropDown) }} className="tw-text-xl tw-text-center tw-outline-none tw-border-none tw-bg-white">...</button>
                                    <ul className="tw-p-0 tw-text-white tw-list-none tw-absolute tw-right-3 tw-bg-white   tw-z-10 tw-border tw-border-[#EEEEEE] tw-rounded-sm  tw-border-solid" style={{ transition: "opacity 0.1s, z-index 0.1s, max-height: 5s", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.06)" }}>
                                        <li className={`${!showDropDown ? "tw-hidden" : ""} tw-flex  tw-justify-center tw-w-28 tw-pt-2 tw-pb-2 tw-pr-1 tw-pl-1 tw-list-none`}>
                                            <a className="tw-text-sm tw-flex tw-items-center  tw-gap-2 tw-text-black tw-no-underline hover:tw-text-black " href="#">
                                                <svg width="15" height="15" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.5833 2.34338C15.824 2.10262 16.1098 1.91164 16.4244 1.78134C16.739 1.65105 17.0761 1.58398 17.4166 1.58398C17.7571 1.58398 18.0942 1.65105 18.4088 1.78134C18.7233 1.91164 19.0092 2.10262 19.2499 2.34338C19.4907 2.58413 19.6817 2.86995 19.812 3.18452C19.9422 3.49908 20.0093 3.83623 20.0093 4.17671C20.0093 4.51719 19.9422 4.85434 19.812 5.1689C19.6817 5.48347 19.4907 5.76929 19.2499 6.01004L6.87492 18.385L1.83325 19.76L3.20825 14.7184L15.5833 2.34338Z" stroke="#999FAB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                Edit Profile</a>
                                        </li>
                                        <li className={`${!showDropDown ? "tw-hidden" : ""} tw-flex  tw-justify-center tw-w-28 tw-pt-2 tw-pb-2 tw-pr-1 tw-pl-1 tw-list-none`}>
                                            <a onClick={logOutUser} className="tw-text-sm tw-flex tw-items-center  tw-gap-2 tw-text-black tw-no-underline hover:tw-text-black " href="#">
                                                <Image src="/icons/shutdown.svg" width="15" height="15" alt="Logout Icon" />


                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>  */}
                            </div>
                            {/* <p className="tagline-wrapper pt-2">{profile?.tagline}</p> */}
                            <div className="d-flex flex-wrap pt-3">
                                {userProfile?.tags?.map((tag, idx) => {
                                    return (
                                        <div
                                            className="me-2 mb-2"
                                            key={`${idx}_tag_profile`}
                                        >
                                            <Tag
                                                content={tag.tag}
                                                icon={tag.icon}
                                                size={16}
                                                color={tag.color}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="about-wrapper pt-3">
                                <p className="about mb-2 mt-2">About</p>
                                <p className="about-text">{userProfile?.bio}</p>
                                <p></p>
                            </div>
                            {/*
                            <div className="d-flex pt-3">
                                {SOCIALMEDIALINKS.map((platform, idx) => {
                                    return (
                                        <Sociallink
                                            link={platform.link}
                                            icon={platform.icon}
                                            size={20}
                                            key={`${idx}_socialmedialink`}
                                        />
                                    )
                                })}
                            </div>
                            */}
                        </div>
                    </>
                )}
            </div>
            <style jsx>{`
                .profile-page-wrapper {
                    background: white;
                    border-radius: 10px 10px 10px 10px;
                    border: 1px solid #e4e8f1;

                    margin-left: 40px;

                    min-height: 90vh;
                    min-width: 480px;
                    width: 60%;
                }
                .profile-banner {
                    border-radius: 10px 10px 0px 0px;
                    background: ${userProfile?.color};
                    height: 150px;
                    width: 100%;
                }
                .profile-pic-wrapper {
                    top: calc(150px - 64px);
                    left: 50px;
                }
                .profile-btn {
                    height: 40px;
                    min-width: 120px;
                    border-style: solid;
                    border-radius: 8px;
                    border-width: 1px;
                    font-size: 14px;
                    font-weight: 600;
                }
                .follow-btn {
                    color: #707785;
                    background-color: white;
                    border-color: #dee0e5;
                }
                .message-btn {
                    color: white;
                    background-color: #5a52b7;
                    border-color: #5a52b7;
                }
                .logout-btn {
                    background-color: white;
                    border-color: red;
                    border-width: 1px;
                }
                .profile-edit-btn {
                    padding: 5px;
                    border-radius: 5px;
                    font-weight: 600;
                }
                .profile-edit-btn:hover {
                    background-color: #ebebeb;
                }
                .start-padding {
                    padding-left: 50px;
                }
                .profile-name {
                    padding-top: 14px;
                    font-weight: 600;
                    font-size: 20px;
                }
                .num-description {
                    color: #999fab;
                    font-size: 14px;
                }
                .num {
                    color: black;
                    font-weight: 600;
                }
                .tagline-wrapper {
                    font-weight: 500;
                    font-size: 16px;
                }
                .about {
                    font-size: 18px;
                    font-weight: 600;
                }
                .about-text {
                    font-size: 16px;
                    color: #707785;
                }

                .hide {
                }
                .show {
                }
            `}</style>
        </Desktoplayout>
        // 'hide' and 'show' classes to hide and show the things if the person is viewing his own profile
    )
}

export default Profile
