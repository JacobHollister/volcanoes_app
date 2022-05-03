import { createContext, useContext, useEffect, useState } from "react";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
            loading: false,
            loggedIn: user ? true : false,
            registerSuccess: false,
            error: false,
            message: "null",
            token: user ? user.token : null
        }

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [authState, setAuthState] = useState( initialState )

    const setRegisterSuccess = (success) => {
        setAuthState(prev => {
            return {...prev, registerSuccess: success}
        })
    }

    const setLoading = (loading) => {
        setAuthState(prev => {
            return {...prev, loading}
        })
    }

    const setLoggedIn = (loggedIn) => {
        setAuthState(prev => {
            return {...prev, loggedIn}
        })
    }

    const setError = (error) => {
        setAuthState(prev => {
            return {...prev, error}
        })
    }

    const setMessage = (message) => {
        setAuthState(prev => {
            return {...prev, message}
        })
    }

    const logout = () => {
        localStorage.removeItem("user")
        setAuthState(initialState)
    }


    const register = (formData) => {
        const options = {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }
        const url = "http://sefdb02.qut.edu.au:3001/user/register"

        setLoading(true)
        fetch(url, options)
            .then(res =>
                res.json()
            )
            .then(res => 
            {   
                if(res.error === true){
                    setError(true)
                    setMessage(res.message)
                } else {
                    setRegisterSuccess(true)
                }
                setLoading(true)
            })
    }

    const login = (formData) => {
        const options = {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }
        const url = "http://sefdb02.qut.edu.au:3001/user/login"

        setLoading(true)
        fetch(url, options)
            .then(res =>
                res.json()
            )
            .then(res => 
            {   
                if(res.error === true){
                    setError(true)
                    setMessage(res.message)
                } else {
                    localStorage.setItem('token', JSON.stringify(res))
                    setLoggedIn(true)
                }
                setLoading(true)
            })
    }

    return (
        <AuthContext.Provider value={{...authState, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>

    )
}