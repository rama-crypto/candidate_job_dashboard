import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'

import { Pageloader, Sectionloader } from '../components/loader'

import Inputgroup from '../components/inputgroup'
import yupErrorMap from '../utils/yupErrorMap'

import getAxiosInstance from '../components/auth/getAxiosInstance'
import AuthContext from '../components/auth/AuthContext'

const SignUp = () => {
    const router = useRouter()

    const { invite } = router.query

    const { token } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)
    const [signUpLoading, setSignUpLoading] = useState(false)

    const [step, setStep] = useState(0)
    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [schoolname, setSchoolName] = useState('')
    const [linkedin, setLinkedIn] = useState('')

    const [questions, setQuestions] = useState([])

    const [aone, setAone] = useState('')
    const [atwo, setAtwo] = useState('')
    const [athree, setAthree] = useState('')
    const [afour, setAfour] = useState('')
    const [errors, setErrors] = useState(undefined)

    const firstSchema = yup.object().shape({
        fullname: yup.string().required('Please enter your full name!'),
        email: yup
            .string()
            .email('Please enter a correct email id!')
            .required('Please enter your email!'),
    })

    const secondSchema = yup.object().shape({
        // schoolname: yup.string().required('Please enter your school name!'),
        linkedin: yup
            .string()
            .url('Please enter a correct url!')
            .required('Please link your LinkedIn profile!'),
    })

    const thirdSchema = yup.object().shape({
        aone: yup
            .string()
            .max(
                300,
                'This question have to be answered within 300 characters!'
            )
            .required('Please answer this question!'),
        atwo: yup
            .string()
            .max(
                300,
                'This question have to be answered within 300 characters!'
            )
            .required('Please answer this question!'),
    })

    const fourthSchema = yup.object().shape({
        athree: yup
            .string()
            .max(
                300,
                'This question have to be answered within 300 characters!'
            )
            .required('Please answer this question!'),
        afour: yup
            .string()
            .max(
                300,
                'This question have to be answered within 300 characters!'
            )
            .required('Please answer this question!'),
    })

    const handlePrevStep = () => {
        setStep((prev) => {
            if (prev > 0) return prev - 1
            else return prev
        })
    }

    const handleNextStep = async () => {
        if (step === 0) {
            const data = {
                fullname: fullname,
                email: email,
            }
            const isValid = await firstSchema.isValid(data, {
                abortEarly: false,
            })
            if (isValid) {
                setErrors(undefined)
                setStep((prev) => prev + 1)
            } else {
                const errors = await firstSchema
                    .validate(data, {
                        abortEarly: false,
                    })
                    .catch((err) => {
                        return yupErrorMap(err)
                    })
                console.log('first form errors', errors)
                setErrors(errors)
            }
        } else if (step === 1) {
            const data = {
                // schoolname: schoolname,
                linkedin: linkedin,
            }
            const isValid = await secondSchema.isValid(data, {
                abortEarly: false,
            })
            if (isValid) {
                setErrors(undefined)
                setStep((prev) => prev + 1)
            } else {
                const errors = await secondSchema
                    .validate(data, {
                        abortEarly: false,
                    })
                    .catch((err) => {
                        return yupErrorMap(err)
                    })
                console.log('second form errors', errors)
                setErrors(errors)
            }
        } else if (step === 2) {
            const data = {
                aone: aone,
                atwo: atwo,
            }
            const isValid = await thirdSchema.isValid(data, {
                abortEarly: false,
            })
            if (isValid) {
                setErrors(undefined)
                setStep((prev) => prev + 1)
            } else {
                const errors = await thirdSchema
                    .validate(data, {
                        abortEarly: false,
                    })
                    .catch((err) => {
                        return yupErrorMap(err)
                    })
                console.log('second form errors', errors)
                setErrors(errors)
            }
        } else if (step === 3) {
            const data = {
                athree: athree,
                afour: afour,
            }
            const isValid = await fourthSchema.isValid(data, {
                abortEarly: false,
            })
            if (isValid) {
                setErrors(undefined)
                setStep((prev) => prev + 1)
            } else {
                const errors = await fourthSchema
                    .validate(data, {
                        abortEarly: false,
                    })
                    .catch((err) => {
                        return yupErrorMap(err)
                    })
                console.log('third form errors', errors)
                setErrors(errors)
            }
        } else if (step === 4) {
            console.log('there is no step 5')
            return
        }
    }

    const getSignUpQuestions = async () => {
        try {
            console.log('fetching questions')
            const resp = await getAxiosInstance().get('auth/questions/')
            console.log('fetched questions', resp.data)
            setQuestions(resp.data)
            setLoading(false)
        } catch (err) {
            console.log('error while fetching questions', err)
            setLoading(false)
        }
    }

    const handleSignUp = async () => {
        setSignUpLoading(true)
        const answers = [
            {
                ques: questions[0].id,
                ans: aone,
            },
            {
                ques: questions[1].id,
                ans: atwo,
            },
            {
                ques: questions[2].id,
                ans: athree,
            },
            {
                ques: questions[3].id,
                ans: afour,
            },
        ]
        try {
            console.log('initiating sign up')
            const resp = await getAxiosInstance().post('auth/signup/', {
                name: fullname,
                email: email,
                linkedin: linkedin,
                answers: answers,
                school_text: schoolname,
            })
            console.log('sign up SUCCESS', resp)
            setSignUpLoading(false)
            handleNextStep()
        } catch (err) {
            console.log('error while signing up', err)
            const message = err?.response?.data?.email?.[0]
            if (message?.includes('exists')) {
                toast(
                    'An account with this email already exists! Redirecting to login page!'
                )
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            } else {
                toast('Oops! Please try again!')
            }
            setSignUpLoading(false)
        }
    }

    useEffect(() => {
        getSignUpQuestions()
    }, [])

    useEffect(() => {
        if (token) {
            router.push('/internships/')
        }
    }, [token])

    if (loading) {
        return (
            <>
                <Pageloader />
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Candidate Job Portal - Sign Up</title>
                <meta
                    content="Job Portal"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav>
                <div style={{ position: 'relative' }}>
                    <img src="/portal_icon.png" className="nav-icon" />
                </div>
            </nav>
            <main className="d-flex vw-100 vh-100">
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-0 col-md-1 col-xxl-2"></div>
                        <div className="col-12 col-md-10 col-xxl-8 h-100 d-flex flex-column justify-content-center">
                            <div className="d-flex flex-column align-items-center">
                                <div className="pb-wrapper d-flex flex-row align-items-center w-100 justify-content-center">
                                    <div
                                        className={`pb-circle d-flex justify-content-center align-items-center ${
                                            step >= 0 && 'bg-purple'
                                        }`}
                                        style={{
                                            borderColor:
                                                step >= 0 ? '#5a52b7' : '',
                                        }}
                                    >
                                        <span
                                            className={`${
                                                step >= 0 && 'text-white'
                                            }`}
                                        >
                                            1
                                        </span>
                                    </div>
                                    <span
                                        className={`pb-line`}
                                        style={{
                                            borderColor: step >= 1 && '#5a52b7',
                                        }}
                                    ></span>
                                    <div
                                        className={`pb-circle d-flex justify-content-center align-items-center ${
                                            step >= 1 && 'bg-purple'
                                        }`}
                                        style={{
                                            borderColor:
                                                step >= 1 ? '#5a52b7' : '',
                                        }}
                                    >
                                        <span
                                            className={`${
                                                step >= 1 && 'text-white'
                                            }`}
                                        >
                                            2
                                        </span>
                                    </div>
                                    <span
                                        className={`pb-line`}
                                        style={{
                                            borderColor: step >= 2 && '#5a52b7',
                                        }}
                                    ></span>
                                    <div
                                        className={`pb-circle d-flex justify-content-center align-items-center ${
                                            step >= 2 && 'bg-purple'
                                        }`}
                                        style={{
                                            borderColor:
                                                step >= 2 ? '#5a52b7' : '',
                                        }}
                                    >
                                        <span
                                            className={`${
                                                step >= 2 && 'text-white'
                                            }`}
                                        >
                                            3
                                        </span>
                                    </div>
                                    <span
                                        className={`pb-line`}
                                        style={{
                                            borderColor: step >= 3 && '#5a52b7',
                                        }}
                                    ></span>
                                    <div
                                        className={`pb-circle d-flex justify-content-center align-items-center ${
                                            step >= 3 && 'bg-purple'
                                        }`}
                                        style={{
                                            borderColor:
                                                step >= 3 ? '#5a52b7' : '',
                                        }}
                                    >
                                        <span
                                            className={`${
                                                step >= 3 && 'text-white'
                                            }`}
                                        >
                                            4
                                        </span>
                                    </div>
                                </div>
                                {step < 4 && (
                                    <h2 className="mt-4 p-2 text-center">
                                        <strong>
                                            Welcome! First things first...
                                        </strong>
                                    </h2>
                                )}
                                <div className="input-wrapper d-flex flex-column align-items-center mt-5">
                                    {step == 0 && (
                                        <>
                                            <Inputgroup
                                                label={'Full Name'}
                                                id={'full-name'}
                                                placeholder={'Elon Musk'}
                                                type={'text'}
                                                error={
                                                    errors?.['fullname'] || ''
                                                }
                                                value={fullname}
                                                setter={setFullName}
                                                important={true}
                                            />
                                            <Inputgroup
                                                label={'Email'}
                                                id={'email'}
                                                placeholder={
                                                    'yourname@gmail.com'
                                                }
                                                type={'email'}
                                                error={errors?.['email'] || ''}
                                                value={email}
                                                setter={setEmail}
                                                important={true}
                                            />
                                        </>
                                    )}
                                    {step == 1 && (
                                        <>
                                            <Inputgroup
                                                label={'School Name'}
                                                id={'school-name'}
                                                placeholder={'DPS Vasant Kunj'}
                                                type={'text'}
                                                error={
                                                    errors?.['schoolname'] || ''
                                                }
                                                value={schoolname}
                                                setter={setSchoolName}
                                                important={true}
                                            />
                                            <Inputgroup
                                                label={'LinkedIn Profile'}
                                                id={'linkedin'}
                                                placeholder={
                                                    'https://linkedinprofile.com/'
                                                }
                                                type={'url'}
                                                error={
                                                    errors?.['linkedin'] || ''
                                                }
                                                value={linkedin}
                                                setter={setLinkedIn}
                                                important={true}
                                            />
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <Inputgroup
                                                label={questions?.[0]?.ques}
                                                id={'aone'}
                                                placeholder={'Your answer'}
                                                type="text"
                                                error={errors?.['aone'] || ''}
                                                value={aone}
                                                setter={setAone}
                                                important={true}
                                            />
                                            <Inputgroup
                                                label={questions?.[1]?.ques}
                                                id={'atwo'}
                                                placeholder={'Your answer'}
                                                type="text"
                                                error={errors?.['atwo'] || ''}
                                                value={atwo}
                                                setter={setAtwo}
                                                important={true}
                                            />
                                        </>
                                    )}
                                    {step == 3 && (
                                        <>
                                            <Inputgroup
                                                label={questions?.[2]?.ques}
                                                id={'athree'}
                                                placeholder={'Your answer'}
                                                type="text"
                                                error={errors?.['athree'] || ''}
                                                value={athree}
                                                setter={setAthree}
                                                important={true}
                                            />
                                            <Inputgroup
                                                label={questions?.[3]?.ques}
                                                id={'afour'}
                                                placeholder={'Your answer'}
                                                type="text"
                                                error={errors?.['afour'] || ''}
                                                value={afour}
                                                setter={setAfour}
                                                important={true}
                                            />
                                        </>
                                    )}
                                    {step < 4 && (
                                        <div className="mt-3 w-100 text-center mb-4">
                                            {step < 3 && (
                                                <button
                                                    className="next-btn w-100 mb-1 bg-purple"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        handleNextStep()
                                                    }}
                                                >
                                                    Next
                                                </button>
                                            )}
                                            {step === 3 && (
                                                <button
                                                    className="next-btn w-100 mb-1 bg-purple d-flex flex-row justify-content-center align-items-center"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        handleSignUp()
                                                    }}
                                                    disabled={signUpLoading}
                                                >
                                                    {signUpLoading ? (
                                                        <Sectionloader
                                                            size={14}
                                                            color={
                                                                signUpLoading
                                                                    ? 'white'
                                                                    : '#5a52b7'
                                                            }
                                                        />
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            )}
                                            {
                                                <span
                                                    role={'button'}
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        handlePrevStep()
                                                    }}
                                                    style={{
                                                        height: '25px',
                                                        opacity:
                                                            step !== 0
                                                                ? '1'
                                                                : '0',
                                                    }}
                                                >
                                                    <strong className="fc-purple underline-hover">
                                                        Back
                                                    </strong>
                                                </span>
                                            }
                                        </div>
                                    )}
                                    {step === 4 && (
                                        <>
                                            <div className="cong-gif-container">
                                                <img
                                                    src="/transparent_congrats.gif"
                                                    style={{ height: '225px' }}
                                                />
                                            </div>
                                            <div className="mt-4 w-100 text-center">
                                                <h3 className="fw-bold">
                                                    Congratulations, {fullname}
                                                </h3>
                                                <p className="text-muted">
                                                    <span>
                                                        You have successfully
                                                        signed up to our
                                                        platform.
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="mt-2 w-100  mb-4">
                                                <button
                                                    className="next-btn w-100 bg-purple"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        router.push('/login')
                                                    }}
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-0 col-md-1 col-xxl-2"></div>
                    </div>
                </div>
            </main>
            <style jsx>{`
                .nav-icon {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    min-height: 35px;
                    height: 6vh;
                }
                .pb-wrapper {
                    margin-top: min(0px, min(150px, 14vh));
                }
                .pb-circle {
                    min-width: 25px;
                    min-height: 25px;
                    width: 3vw;
                    height: 3vw;
                    border-radius: 50%;
                    border-style: solid;
                    border-width: 1px;
                    border-color: #c4c4c4;
                }
                .pb-line {
                    min-width: 5px;
                    border-width: 1px 0px 0px 0px;
                    border-style: solid;
                    border-color: ${'#c4c4c4'};
                    width: 5%;
                    height: 0px;
                }
                .input-wrapper {
                    min-width: 250px;
                    width: 50%;
                }
                .next-btn {
                    min-height: 44px;
                    border-radius: 8px;
                    border-color: transparent;
                    color: white;
                }
                .underline-hover:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    )
}

export default SignUp
