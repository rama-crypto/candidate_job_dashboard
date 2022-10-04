import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Pageloader } from '../loader'

import AuthContext from './AuthContext'
import getUserProfile from './getUserProfile'
import getAxiosInstance from './getAxiosInstance'

const AuthProvider = ({ children }) => {
    const router = useRouter()

    const [authLoading, setAuthLoading] = useState(true)

    const [profile, setProfile] = useState({})
    const [showOnboardModal, setShowOnboardModal] = useState(false)

    // token is set to be an empty string which returns 'false' in an IF conditional
    const [token, setToken] = useState('')

    // only when a new user logins into the platform
    const [firstLoginToken, setFirstLoginToken] = useState('')

    const glogin = (response) => {
        getAxiosInstance()
            .post('/auth/google/', {
                credential: response.credential,
            })
            .then(({ data }) => {
                window.localStorage.setItem('token', data.token)
                setFirstLoginToken(data.token)
            })
            .catch((err) => {
                if (err?.response?.status === 404) {
                    // console.log("the email entered while logging is not in the database, verified or not")
                    toast('Please sign up before logging in!')
                } else if (err?.response?.status === 403) {
                    toast('Please wait for your email to be verified!')
                } else {
                    toast('Oops! Please try again!')
                }
            })
    }

    // This auth provider 'useEffect' will execute at every page if that page is not pushed by the router
    // EVERYTHING HAS BEEN INITIALISED PROPERLY IF TOKEN IS NOT AN EMPTY STRING
    useEffect(() => {
        console.log('auth provider use effect was executed')
        const stored_token = window.localStorage.getItem('token')
        if (stored_token) {
            getUserProfile(
                stored_token,
                (profile) => {
                    // the token is being verified on initial render
                    // and then setToken is called
                    // set profile first so that non-null token implies non-empty profile
                    console.log('USER PROFILE', profile)
                    setProfile(profile)
                    setShowOnboardModal(!profile?.complete)
                    setToken(stored_token)

                    // console.log('profile in authprovider effect', profile)
                    if (
                        router.pathname === '/login' ||
                        router.pathname === '/' ||
                        router.pathname === '/signup'
                    ) {
                        // console.log("redirecting to feed, user profile fetch success")
                        console.log('redirecting to feed')
                        router.push('/internships/')
                    }
                },
                (err) => {
                    console.log('error while fetching user profile', err)
                    if (router.pathname !== '/login') {
                        // console.log("pushing the login url")
                        router.push('/login')
                    }
                }
            )
        } else {
            // console.log('token not found, redirecting to login page')
            if (router.pathname !== '/login' && router.pathname !== '/signup') {
                router.push('/login')
                if (router.pathname !== '/')
                    toast('Please first login to access the platform!')
            }
        }
    }, [firstLoginToken])
    // 'token' dependency because at the first time login, the 'glogin' function sets token and
    // this effect has to run in order to succesfully redirect to feed after first login

    useEffect(() => {
        if (token) {
            if (showOnboardModal && router.pathname !== '/internships/') {
                router.push('/internships/')
            }
            setAuthLoading(false)
        }
    }, [token])

    if (
        router.pathname !== '/login' &&
        router.pathname !== '/signup' &&
        authLoading
    ) {
        return <Pageloader />
    }

    // mount all pages except '/login' and '/signup' only when 'authcontext' is hydrated
    return (
        <AuthContext.Provider
            value={{
                token,
                profile,
                showOnboardModal,
                setShowOnboardModal,
                setToken,
                glogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
