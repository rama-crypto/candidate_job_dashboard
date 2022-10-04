import React, { useEffect, useState } from 'react'

export function GoogleSignButton({ width, loginCallBack }) {
    const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)

    useEffect(() => {
        if (gsiScriptLoaded) return

        const initializeGsi = () => {
            if (!window.google || gsiScriptLoaded) return

            setGsiScriptLoaded(true)

            const renderGB = () => {
                window.google.accounts.id.initialize({
                    client_id:
                        '580962116990-junjpjhpntld9pvm04nk8qevj1pcnucb.apps.googleusercontent.com',
                    callback: handleGoogleSignIn,
                })

                window.google.accounts.id.renderButton(
                    document.getElementById('g_login_btn'),
                    {
                        type: 'standard',
                        shape: 'rectangular',
                        theme: 'outline',
                        text: 'signin_with',
                        size: 'large',
                        logo_alignment: 'left',
                        width: width,
                    }
                )
            }

            renderGB()
        }

        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = initializeGsi
        script.async = true
        script.id = 'google-client-script'
        document.querySelector('body')?.appendChild(script)

        return () => {
            // Cleanup function that runs when component unmounts
            window.google?.accounts.id.cancel()
            document.getElementById('google-client-script')?.remove()
        }
    }, [gsiScriptLoaded])

    const handleGoogleSignIn = (res) => {
        if (!res.clientId || !res.credential) return
        loginCallBack(res)
    }

    return (
        <>
            <div id="g_login_btn" />
        </>
    )
}
