import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="flex justify-center">
            <h1 className="text-4xl font-bold">Nothing More</h1>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<App/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
    )
}
