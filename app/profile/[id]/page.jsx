'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const [userPrompts, setUserPrompts] = useState([]);

    const fetchUserPrompts = async () => {
        const response = await fetch(`/api/users/${params?.id}/prompts`);
        const data = await response.json();
        setUserPrompts(data);
    };

    useEffect(() => {
        if (params?.id) fetchUserPrompts();
    }, [params?.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPrompts}
        />
    );
};

export default UserProfile;
