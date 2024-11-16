import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [bio, setBio] = useState('');

    // Fetch profile data when component loads
    const fetchProfile = async () => {
        const token = localStorage.getItem('token'); // Retrieve the stored token
        const response = await axios.get('/profile/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setBio(response.data.bio);
    };

    // Update profile data
    const updateProfile = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('bio', bio);

        const response = await axios.put('/profile/', formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
    };

    useEffect(() => {
        fetchProfile(); // Fetch profile on component mount
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            <img src={profile.avatar} alt="Avatar" />
            <input 
                type="file" 
                onChange={(e) => setAvatar(e.target.files[0])} 
            />
            <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
            />
            <button onClick={updateProfile}>Update</button>
        </div>
    );
};

export default Profile;
const [isLoading, setIsLoading] = useState(false);

const fetchProfile = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('/profile/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setBio(response.data.bio);
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
    setIsLoading(false);
};
return (
    <div>
        <h2>Profile</h2>
        {isLoading ? <p>Loading profile...</p> : (
            <>
                <img src={profile.avatar} alt="Avatar" />
                <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                <button onClick={updateProfile}>Update</button>
            </>
        )}
    </div>
);
