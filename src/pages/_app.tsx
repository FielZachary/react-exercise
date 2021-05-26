import "../app/styles/globals.css"
// eslint-disable-next-line import/no-duplicates
import "firebase/auth"
// eslint-disable-next-line import/no-duplicates
import "firebase/firestore"

import firebase from "firebase/app"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { Provider } from "react-redux"

import { useAppDispatch } from "../app/redux/hooks"
import { store } from "../app/redux/store"
import { CleanState, onAuthStateChange } from "../app/redux/user/user.slice"
import User from "../domain/entities/User"

const firebaseConfig = {
    apiKey: "AIzaSyA2s-wiQ7LM7CmnW6I30HD7TiMC1ej-hoY",
    authDomain: "kahero-staging.firebaseapp.com",
    databaseURL: "https://kahero-staging.firebaseio.com",
    projectId: "kahero-staging",
    storageBucket: "kahero-staging.appspot.com",
    messagingSenderId: "564664019140",
    appId: "1:564664019140:web:27f09ad92896d622528191",
    measurementId: "G-PP1FZJHFJN",
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else {
    firebase.app()
}

const db = firebase.firestore()

export { db, firebase }

function MyApp({ Component, pageProps }) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((authenticated) => {
            if (authenticated) {
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then(() => {
                        // idTokenfinal = idToken
                        // setAuth(true)
                    })
                    .catch((e) => e)
                firebase.auth().onIdTokenChanged((user) => {
                    if (user) {
                        // User is signed in or token was refreshed.
                        user.getIdToken().then(() => {
                            // idTokenfinal = idToken
                        })
                    }
                })

                const currentUser = new User(authenticated.email, true)
                currentUser.uid = authenticated.uid
                dispatch(onAuthStateChange(currentUser))
            } else {
                dispatch(CleanState())
            }
        })
    }, [])

    return <Component {...pageProps} />
}

function MyAppWrapper({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <MyApp Component={Component} pageProps={pageProps} />
        </Provider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    pageProps: PropTypes.shape({}),
}

MyAppWrapper.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    pageProps: PropTypes.shape({}),
}

export default MyAppWrapper
