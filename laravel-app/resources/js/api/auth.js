import axios from 'axios';
import call from './utils';

export async function createAccount(username, email, password, confirmPassword) {
    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        await call('/sanctum/csrf-cookie', 'GET', {});
        const response = await call('/api/register', 'POST', { username, email, password, confirmPassword });

        if (response.status !== 200) {
            return 'There was an error creating your account. Please try again.';
        } else {
            let user = response.data.user;
            return user;
        }
    } catch (error) {
        return 'There was an error creating your account. Please try again.';
    }
}

export async function login(email, password) {
    try {
        return await axios.get('/sanctum/csrf-cookie')
            .then(async () => {
                const response = await call('/api/auth', 'POST', {
                    email: email,
                    password: password
                });

                if (response.status === 401) {
                    throw new Error('Invalid email or password');
                }
                if (response.status === 200) {
                    return await response.data.user;
                }
            });
    
    } catch (error) {
        throw new Error('There was an error logging in. Please try again.');
    }
}

export async function logout() {
    try {
        await call('/api/logout', 'POST', {});
    } catch (error) {
        throw new Error('There was an error logging out.');
    }
}

export async function getUser() {
    try {
        const response = await call('/api/user', 'GET', {});

        if (response.status === 200) {
            let user = response.data.user;
            return user;
        }
    } catch (error) {
        throw new Error('There was an error getting your account information.');
    }
}