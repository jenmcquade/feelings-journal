import React, { useState } from 'react';
import StatusMessage from './StatusMessage';
import { useNavigate } from 'react-router-dom';
import { setUserContext } from '../../../actions/auth';
import { createAccount } from '../../../api/auth';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (userData) => {
        dispatch(setUserContext(userData));
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let userData = await createAccount(username, email, password, confirmPassword);
            if (userData) {
                handleLogin(userData);
                navigate('/');
                return;
            }
        } catch (error) {
            setStatusMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-initial">
            <h1 className="text-4xl font-bold mb-4">Create Account</h1>
            {statusMessage && <StatusMessage message={statusMessage} />}
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="createAccountUsername"
                        type="text"
                        placeholder="Username"
                        autoComplete='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="createAccountEmail"
                        type="email"
                        placeholder="Email"
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="createAccountPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="crateAccountConfirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;