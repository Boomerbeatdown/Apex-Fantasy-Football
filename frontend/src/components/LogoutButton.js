// src/components/LogoutButton.js
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login', { replace: true });
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
