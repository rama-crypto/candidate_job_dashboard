import React, { useEffect, useMemo, useState } from 'react'
import * as yup from 'yup'
import { BiArrowBack } from 'react-icons/bi'

import Tag from '../interesttag'
import Customreactmodal from '../modal/customreactmodal'
import Inputgroup, { Textgroup } from '../inputgroup'

import { ICONSREPO } from '../../constants/social_links'

import yupErrorMap from '../../utils/yupErrorMap'
import Errortext from '../Errortext'
import { ProfileApi } from '../../api/profile'
import { Sectionloader } from '../loader'

const BANNERCOLORS = [
    '#ff7474',
    '#ff845d',
    '#fd9a00',
    '#00b85c',
    '#37c5ab',
    '#328aff',
    '#5f6ceb',
    '#894cff',
    '#cc81E2',
    '#ff68D4',
    '#ff5381',
    '#fb4e4e',
]

const Onboardcolorinput = ({ color, selectedColor, setSelectedColor }) => {
    return (
        <>
            <div
                className="circle"
                role={'button'}
                onClick={(event) => {
                    event.preventDefault()
                    setSelectedColor(color)
                }}
            ></div>
            <style jsx>{`
                .circle {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    border-style: solid;
                    border-width: 5px;
                    border-color: ${Boolean(color === selectedColor)
                        ? 'white'
                        : color};
                    background-color: ${color};
                    outline: 1px solid
                        ${Boolean(color === selectedColor)
                            ? color
                            : 'transparent'};
                }
            `}</style>
        </>
    )
}

const Onboardbuttons = ({ onboardStep, handleOnModalNextClick, loading }) => {
    return (
        <>
            <button
                className="w-100 bg-purple"
                style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                    height: '40px',
                }}
                onClick={(event) => {
                    event.preventDefault()
                    handleOnModalNextClick()
                }}
                disabled={loading}
            >
                {Boolean(onboardStep === 1) ? 'Save' : 'Save'}
            </button>
        </>
    )
}

const Onboardingmodal = ({
    isOpen = true,
    setShowOnboardModal,
    token,
    editProfileModal = false,
    defaultValues = null,
    handleProfileEditModalSave = null,
}) => {
    // 1. 'true' when fetching social links and tags
    // 2. 'true' when submitting the profile of the new user
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState(
        editProfileModal ? defaultValues?.tags : []
    )
    // this state was to fetch the social media icons and regex
    const [socialMetaData, setSocialMetaData] = useState([])

    const [onboardStep, setOnboardStep] = useState(1)

    const [selectedColor, setSelectedColor] = useState('')
    const [highlight, setHighlight] = useState(``)
    const [aboutMe, setAboutMe] = useState(``)
    const [interests, setInterests] = useState([])

    const [socialMediaLinks, setSocialMediaLinks] = useState({
        linkedin: '',
        github: '',
        instagram: '',
        snapchat: '',
        dev: '',
        medium: '',
    })

    const [yupErrors, setYupErrors] = useState(undefined)

    const profileApi = useMemo(() => {
        return new ProfileApi(token)
    }, [token])

    const firstSchema = yup.object().shape({
        selectedColor: yup.string().required('Please select a color!'),
        highlight: yup
            .string()
            .required('This is a required field!')
            .max(60, 'Highlight must be of at most 60 characters!'),
        aboutMe: yup
            .string()
            .required('This is a required field!')
            .max(200, 'Highlight must be of at most 200 characters!'),
        interests: yup.array().min(1, 'Please select at least one interest!'),
    })

    const secondSchema = yup.object().shape({
        linkedin: yup
            .string()
            .notRequired()
            .url('Please enter a valid url!')
            .matches(
                /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm,
                {
                    message: 'Please enter a valid Linked In profile!',
                    excludeEmptyString: true,
                }
            ),
        github: yup
            .string()
            .notRequired()
            .url('Please enter a valid url!')
            .matches(
                /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i,
                {
                    message: 'Please enter a valid Github profile!',
                    excludeEmptyString: true,
                }
            ),
        instagram: yup
            .string()
            .notRequired()
            .url('Please enter a valid url!')
            .matches(
                /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim,
                {
                    message: 'Please enter a valid Instagram link!',
                    excludeEmptyString: true,
                }
            ),
        snapchat: yup.string().url('Please enter a valid url!').nullable(),
        dev: yup.string().url('Please enter a valid url!').nullable(),
        medium: yup.string().url('Please enter a valid url!').nullable(),
    })

    const handleOnModalBackClick = () => {
        setOnboardStep(1)
    }

    const handleOnModalNextClick = async () => {
        if (onboardStep === 1) {
            const data = {
                selectedColor: selectedColor,
                highlight: highlight,
                aboutMe: aboutMe,
                interests: interests,
            }
            const isValid = await firstSchema.isValid(data, {
                abortEarly: false,
            })
            if (isValid) {
                setYupErrors(undefined)

                const resp = await profileApi.updateProfile(
                    selectedColor,
                    highlight,
                    aboutMe
                )
                console.log(
                    'sent the basic profile details to the server',
                    resp
                )

                // window.location.reload() // Close modal after first step. Remove this line to show the next step.

                if (editProfileModal) {
                    handleProfileEditModalSave({
                        newSelectedColor: selectedColor,
                        newHighlight: highlight,
                        newAboutMe: aboutMe,
                        newInterests: interests,
                        allTags: tags,
                    })
                }

                // setOnboardStep(2)
            } else {
                const errors = await firstSchema
                    .validate(data, {
                        abortEarly: false,
                    })
                    .catch((err) => {
                        return yupErrorMap(err)
                    })
                console.log('onbording number one errors', errors)
                setYupErrors(errors)
            }
        }
        // else if (onboardStep === 2) {
        //     const data = {
        //         ...socialMediaLinks,
        //     }
        //     const isValid = await secondSchema.isValid(data, {
        //         abortEarly: false,
        //     })
        //     if (isValid) {
        //         setYupErrors(undefined)
        //         console.log('onboarding data is legit')

        //         try {
        //             if (editProfileModal) {
        //                 console.log(
        //                     'Onboarding modal opened as to provide EDIT PROFILE interface to the user'
        //                 )
        //             }

        //             // publish social media urls
        //             const socialResp = await profileApi.updateSocialLinks([])

        //             if (editProfileModal) {
        //                 handleProfileEditModalSave({
        //                     newSelectedColor: selectedColor,
        //                     newHighlight: highlight,
        //                     newAboutMe: aboutMe,
        //                     newInterests: interests,
        //                 })
        //             }

        //             setOnboardStep(1)
        //             setShowOnboardModal(false)
        //         } catch (err) {
        //             console.log('error while saving the data to server', err)
        //         }
        //         // send data to the server
        //     } else {
        //         const errors = await secondSchema
        //             .validate(data, {
        //                 abortEarly: false,
        //             })
        //             .catch((err) => {
        //                 return yupErrorMap(err)
        //             })
        //         console.log('onboarding number two errors', errors)
        //         setYupErrors(errors)
        //     }
        // }
    }

    useEffect(async () => {
        if (profileApi)
            try {
                const tagsList = await profileApi.fetchTagsList(0, 50)
                setTags(tagsList)

                if (editProfileModal) {
                    setAboutMe(defaultValues?.aboutMe || '')
                    setHighlight(defaultValues?.highlight || '')
                    setSelectedColor(defaultValues?.selectedColor || '#ff7474')
                    setInterests(defaultValues?.interests || [])
                }

                setLoading(false)
                console.log('ONBOARDING TAGS LIST', tagsList)
            } catch (error) {
                console.log('error while fetching interest tags', error)
            }
    }, [profileApi])

    return (
        <>
            <Customreactmodal
                isOpen={isOpen}
                modalHeading={
                    editProfileModal
                        ? 'Edit your profile!'
                        : onboardStep === 1
                        ? "Let's Go!"
                        : 'Almost Done!'
                }
                height={'60vh'}
                showBackButton={Boolean(onboardStep === 2)}
                showCloseButton={editProfileModal}
                setCloseModal={
                    editProfileModal ? setShowOnboardModal : () => {}
                }
                handleOnModalBackClick={handleOnModalBackClick}
                footerChildren={
                    <Onboardbuttons
                        onboardStep={onboardStep}
                        handleOnModalNextClick={handleOnModalNextClick}
                        loading={loading}
                    />
                }
            >
                {loading ? (
                    <Sectionloader py={4} />
                ) : (
                    <div className="d-flex flex-column ps-4 pe-4 pt-2 pb-2">
                        {Boolean(onboardStep === 2) && (
                            <div className="position-relative">
                                <span
                                    className="position-absolute"
                                    style={{ top: 'calc(-3rem)' }}
                                >
                                    <BiArrowBack color="#dee0e5" size={24} />
                                </span>
                            </div>
                        )}
                        {Boolean(onboardStep === 1) && (
                            <>
                                <div>
                                    <p className="m-0">
                                        <span style={{ fontWeight: 600 }}>
                                            <span style={{ color: 'red' }}>
                                                *
                                            </span>
                                            Choose your signature color!
                                        </span>
                                    </p>
                                    <div className="d-flex flex-row ps-3 mt-2">
                                        {BANNERCOLORS.map((color, idx) => {
                                            return (
                                                <div
                                                    className="me-2"
                                                    key={`${idx}_onboardingcolors`}
                                                >
                                                    <Onboardcolorinput
                                                        color={color}
                                                        selectedColor={
                                                            selectedColor
                                                        }
                                                        setSelectedColor={
                                                            setSelectedColor
                                                        }
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Errortext
                                        error={
                                            yupErrors?.['selectedColor'] || ''
                                        }
                                    />
                                </div>
                                <div className="mt-2">
                                    <Inputgroup
                                        label={'Highlight'}
                                        placeholder={
                                            'CEO of Tesla | Co-Founder PayPal | 89 Million Followers on Twitter'
                                        }
                                        value={highlight}
                                        setter={setHighlight}
                                        id="highlight"
                                        important={true}
                                        error={yupErrors?.['highlight'] || ''}
                                    />
                                </div>
                                <div className="mt-2">
                                    <Textgroup
                                        label={'Write about yourself!'}
                                        value={aboutMe}
                                        setter={setAboutMe}
                                        rows={5}
                                        withEmoji={true}
                                        id="about-me"
                                        important={true}
                                        error={yupErrors?.['aboutMe'] || ''}
                                    />
                                </div>
                                <div className="mt-2">
                                    <p className="m-0 mb-3">
                                        <span style={{ fontWeight: 600 }}>
                                            <span style={{ color: 'red' }}>
                                                *
                                            </span>
                                            Pick your interests!
                                        </span>
                                    </p>
                                    <div
                                        className="d-flex flex-wrap p-2 custom-scrollbar"
                                        style={{
                                            height: '100px',
                                            overflowY: 'auto',
                                            border: '1px solid #dee0e5',
                                            borderRadius: '0.25rem',
                                        }}
                                    >
                                        {tags.map((tag, idx) => {
                                            return (
                                                <div
                                                    className="me-2 mb-2"
                                                    key={`${idx}_tag_modal`}
                                                >
                                                    <Tag
                                                        serverId={tag.id}
                                                        content={tag.tag}
                                                        icon={tag.icon}
                                                        size={16}
                                                        color={tag.color}
                                                        interests={interests}
                                                        handleOnClick={(
                                                            event
                                                        ) => {
                                                            event.preventDefault()
                                                            if (
                                                                interests.includes(
                                                                    tag.id
                                                                )
                                                            ) {
                                                                setInterests(
                                                                    (prev) => {
                                                                        const next =
                                                                            prev.filter(
                                                                                (
                                                                                    value
                                                                                ) =>
                                                                                    value !==
                                                                                    tag.id
                                                                            )
                                                                        return next
                                                                    }
                                                                )
                                                            } else {
                                                                setInterests(
                                                                    (prev) => {
                                                                        const next =
                                                                            prev.concat(
                                                                                [
                                                                                    tag.id,
                                                                                ]
                                                                            )
                                                                        return next
                                                                    }
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Errortext
                                        error={yupErrors?.['interests'] || ''}
                                    />
                                </div>
                            </>
                        )}

                        {/* {Boolean(onboardStep === 2) && (
                            <div className="d-flex flex-column">
                                <div className="mt-1">
                                    <Inputgroup
                                        label={'Linked In'}
                                        type={'url'}
                                        value={socialMediaLinks.linkedin}
                                        setter={(value) => {
                                            setSocialMediaLinks((prev) => {
                                                return {
                                                    ...prev,
                                                    linkedin: value,
                                                }
                                            })
                                        }}
                                        icon={ICONSREPO['linkedin'].icon}
                                        iconSize={24}
                                        error={yupErrors?.['linkedin'] || ''}
                                    />
                                </div>
                                <div className="mt-1">
                                    <Inputgroup
                                        label={'Github'}
                                        type={'url'}
                                        value={socialMediaLinks.github}
                                        setter={(value) => {
                                            setSocialMediaLinks((prev) => {
                                                return {
                                                    ...prev,
                                                    github: value,
                                                }
                                            })
                                        }}
                                        icon={ICONSREPO['github'].icon}
                                        iconSize={24}
                                        error={yupErrors?.['github'] || ''}
                                    />
                                </div>
                                <div className="mt-1">
                                    <Inputgroup
                                        label={'Instagram'}
                                        type={'url'}
                                        value={socialMediaLinks.instagram}
                                        setter={(value) => {
                                            setSocialMediaLinks((prev) => {
                                                return {
                                                    ...prev,
                                                    instagram: value,
                                                }
                                            })
                                        }}
                                        icon={ICONSREPO['instagram'].icon}
                                        iconSize={24}
                                        error={yupErrors?.['instagram'] || ''}
                                    />
                                </div>
                                <div className="mt-1">
                                    <Inputgroup
                                        label={'Snapchat'}
                                        type={'url'}
                                        value={socialMediaLinks.snapchat}
                                        setter={(value) => {
                                            setSocialMediaLinks((prev) => {
                                                return {
                                                    ...prev,
                                                    snapchat: value,
                                                }
                                            })
                                        }}
                                        icon={ICONSREPO['snapchat'].icon}
                                        iconSize={24}
                                        error={yupErrors?.['snapchat'] || ''}
                                    />
                                </div>
                                <div className="mt-1">
                                    <Inputgroup
                                        label={'Dev'}
                                        type={'url'}
                                        value={socialMediaLinks.dev}
                                        setter={(value) => {
                                            setSocialMediaLinks((prev) => {
                                                return {
                                                    ...prev,
                                                    dev: value,
                                                }
                                            })
                                        }}
                                        icon={ICONSREPO['dev'].icon}
                                        iconSize={24}
                                        error={yupErrors?.['dev'] || ''}
                                    />
                                </div>
                                <div className="mt-1">
                                    <Inputgroup
                                        label={'Medium'}
                                        type={'url'}
                                        value={socialMediaLinks.medium}
                                        setter={(value) => {
                                            setSocialMediaLinks((prev) => {
                                                return {
                                                    ...prev,
                                                    medium: value,
                                                }
                                            })
                                        }}
                                        icon={ICONSREPO['medium'].icon}
                                        iconSize={24}
                                        error={yupErrors?.['medium'] || ''}
                                    />
                                </div>
                            </div>
                        )} */}
                    </div>
                )}
                <style jsx>{`
                    .header {
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .blue {
                        filter: invert(12%) sepia(63%) saturate(6234%)
                            hue-rotate(246deg) brightness(87%) contrast(156%);
                    }
                `}</style>
            </Customreactmodal>
        </>
    )
}

export default Onboardingmodal
