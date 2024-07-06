import CreateAccount from './CreateAccount';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Auth() {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);
    
    return (
        <div className="flex flex-row flex-wrap gap-20 justify-center">
            <Login />
            <CreateAccount />
        </div>
    );
}

export default Auth;