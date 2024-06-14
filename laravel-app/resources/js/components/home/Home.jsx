import React from 'react';
import SubmitFeelings from '../forms/SubmitFeelings';
import { useSelector } from 'react-redux';

function Home() {
    const user = useSelector(state => state.auth.user);
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col flex-initial pt-4">
                {user ? <SubmitFeelings /> : <p className="text-lg">Please login to submit your feelings.</p>}
            </div>
        </div>
    );
}

export default Home;
