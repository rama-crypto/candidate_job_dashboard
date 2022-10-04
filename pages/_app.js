import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import { ToastContainer } from 'react-toastify'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

import AuthProvider from '../components/auth/AuthProvider'

ReactModal.setAppElement('#__next')

const AVAILABLE_LINKS = [
    '/',
    '/signup',
    '/login',
    '/profile/[username]',
    '/internships/[id]',
    '/internships/create',
    '/internships',
]

const MyApp = ({ Component, pageProps, router }) => {
    useEffect(() => {
        if (!AVAILABLE_LINKS.includes(router.pathname)) {
            router.push('/login')
        }
    }, [])

    return (
        <>
            <ToastContainer theme="light" position="bottom-right" />
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}

export default MyApp
