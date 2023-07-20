'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const [myPrompts, setMyPrompts] = useState([]);

    const fetchMyPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/prompts`);
        const data = await response.json();
        setMyPrompts(data);
    };

    useEffect(() => {
        if (session?.user.id) fetchMyPrompts();
    }, [session?.user.id]);

    const handleEdit = () => {};

    const handleDelete = async () => {};

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={myPrompts}
            handleEdit
            handleDelete
        />
    );
};

export default MyProfile;
