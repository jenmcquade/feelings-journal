import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
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
import { setTodaysValuesContext } from '../actions/api';
import { setLoadingContext } from '../actions/api';
import { setAllFeelingsContext } from '../actions/api';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoadingContext(true));
                const [feelings, userData] = await Promise.all([
                    getAllFeelings(),
                    getUser(),
                ]);
    
                if (feelings) {
                    dispatch(setAllFeelingsContext(feelings));
                }
    
                if (userData) {
                    dispatch(setUserContext(userData));
                    dispatch(setTodaysValuesContext(userData));
                }
            } catch (error) {
                console.error('There was an error loading initial data.');
            } finally {
                dispatch(setLoadingContext(false));
            }
        };
    
        fetchData();
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
