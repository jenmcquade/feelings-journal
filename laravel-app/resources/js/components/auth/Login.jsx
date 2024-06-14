import React, { useState } from 'react';
import StatusMessage from './StatusMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserContext } from '../../actions/auth';
import { setLoadingContext } from '../../actions/api';
import { login } from '../../api/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (user) => {
        dispatch(setUserContext(user));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(setLoadingContext(true));
            let user = await login(email, password);
            if (user) {
                handleLogin(user);
                navigate('/');
                return;
            }
        } catch (error) {
            setStatusMessage(error.message);
        } finally {
            dispatch(setLoadingContext(false));
        }
    };

    return (
        <div className="flex flex-col flex-initial">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            {statusMessage && <StatusMessage message={statusMessage} />}
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="loginEmail"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="loginPassword"
                        type="password"
                        placeholder="******************"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;