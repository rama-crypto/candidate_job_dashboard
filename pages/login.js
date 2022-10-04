import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState, useRef } from 'react'

import AuthContext from '../components/auth/AuthContext'
import { GoogleSignButton } from '../components/auth/glogin'

const Login = () => {
    const router = useRouter()
    const { glogin } = useContext(AuthContext)

    const containerRef = useRef()
    const [gButtonWidth, setGButtonWidth] = useState('')

    const handleSignUpClick = () => {
        router.push('/signup')
    }

    useEffect(() => {
        if (containerRef) {
            setGButtonWidth(containerRef?.current?.clientWidth.toString())
        }
    }, [])

    return (
        <>
            <Head>
                <title>Candidate Job Portal - Login</title>
                <meta
                    content="Job Portal"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="d-flex vw-100 vh-100 position-relative">
                <div className="position-absolute">
                    <img
                        src="/portal_icon.png"
                        className="sidebar-icon"
                    />
                </div>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-0 col-md-6 h-100 d-none d-md-block">
                            <div className="d-flex flex-row justify-content-center align-items-center h-100">
                                <img
                                    src="/login_illustration_sq.png"
                                    style={{ width: '80%' }}
                                    className=""
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 h-100">
                            <div className="d-flex flex-column justify-content-center h-100 align-items-center">
                                <div
                                    className="log-in-wrapper"
                                    ref={containerRef}
                                >
                                    <h4 className="font-poppins">
                                        <strong
                                            className="log-in-text"
                                            style={{ maxWidth: '400px' }}
                                        >
                                            Log In
                                        </strong>
                                    </h4>
                                    <p
                                        className="text-muted"
                                        style={{ maxWidth: '400px' }}
                                    >
                                        Enter your credentials to login into
                                        your account
                                    </p>

                                    {gButtonWidth > 0 && (
                                        <GoogleSignButton
                                            loginCallBack={glogin}
                                            width={gButtonWidth}
                                        />
                                    )}
                                    <div className="mt-3">
                                        <span
                                            style={{ fontWeight: 500 }}
                                            className="me-2"
                                        >
                                            Not a member?
                                        </span>
                                        <span
                                            role={'button'}
                                            className="sign-up-btn fc-purple"
                                            style={{ fontWeight: 600 }}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                handleSignUpClick()
                                            }}
                                        >
                                            Sign Up
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer></footer>
            <style jsx>{`
                .font-poppins {
                    font-family: poppins;
                }
                .log-in-wrapper {
                    min-width: 250px;
                    width: 65%;
                }
                .google-login-btn {
                    position: relative;
                    background: transparent;
                    font-weight: 600;
                    border-width: 2px;
                    border-radius: 8px;
                    border-style: solid;
                    border-color: #c4c4c4;
                    font-size: 16px;
                    min-width: 250px;
                    width: 100%;
                }
                .google-icon-btn {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                }
                .or-side {
                    border-style: solid;
                    border-width: 1px 0px 0px 0px;
                    border-color: #c4c4c4;
                    height: 0px;
                }
                .log-in-btn {
                    min-height: 44px;
                    border-radius: 8px;
                    background-color: transparent;
                    border-color: transparent;
                    color: white;
                    background-color: #465ac5;
                }
                .sign-up-btn {
                    font-weight: 500;
                }
                .sign-up-btn:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    )
}

export default Login
