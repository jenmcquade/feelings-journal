import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Header from './header/Header';
import Home from './home/Home';
import Auth from './forms/auth/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '../store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../api/auth';
import { getAllFeelings } from '../api/feelings';
import { setUserContext } from '../actions/auth';
import { setLoadingContext } from '../actions/api';
import { setAllFeelingsContext } from '../actions/api';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const setAllFeelings = async () => {
            try {
                let feelings = await getAllFeelings();
                if (feelings) {
                    dispatch(setAllFeelingsContext(feelings.all_feelings));
                }
            } catch (error) {
                console.error('There was an error getting the feelings.');
            }
        }
        const getUserContext = async () => {
            try {
                dispatch(setLoadingContext(true));
                let userData = await getUser();
                if (userData) {
                    dispatch(setUserContext(userData));
                }
            } catch (error) {
                console.error('There was an error getting the user.');
            } finally {
                dispatch(setLoadingContext(false));
            }
        }

        setAllFeelings();
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
