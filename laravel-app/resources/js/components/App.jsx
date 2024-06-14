import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Header from './header/Header';
import Home from './home/Home';
import Auth from './auth/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '../store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../api/auth';
import { setUserContext } from '../actions/auth';
import { setLoadingContext } from '../actions/api';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserContext = async () => {
            try {
                dispatch(setLoadingContext(true));
                let user = await getUser();
                if (user) {
                    dispatch(setUserContext(user));
                }
            } catch (error) {
                console.error('There was an error getting the user.');
            } finally {
                dispatch(setLoadingContext(false));
            }
        }

        getUserContext();
    }, [dispatch]);

    return (
        <React.StrictMode>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Auth/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
    );
};

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));
    Index.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
