// Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../firebase/auth'
import { useAuth } from '../context/authContext/AuthContext'

const Login = () => {
    const { currentUser } = useAuth() || {}
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate(); // Initialize useHistory

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                // Attempt sign-in
                await doSignInWithEmailAndPassword(email, password)
                // Redirect to home page upon successful sign-in
                navigate('/home');
            } catch (error) {
                // Update error message if sign-in fails
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    // Redirect if user is already logged in
    if (currentUser) {
        return <Navigate to={'/home'} replace={true} />
    }

    return (
        <div>
            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Sign In</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ff6b1c] shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ff6b1c] shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'btn_secondary_rounded'}`}
                            onClick={onSubmit} // Manually trigger sign-in onClick
                    >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link></p>

                </div>
            </main>
        </div>
    )
}

export default Login
