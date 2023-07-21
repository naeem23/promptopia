'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
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

    const handleEdit = (prompt) => {
        router.push(`/update-prompt?id=${prompt._id}`);
    };

    const handleDelete = async (prompt) => {
        const hasConfirmed = confirm(
            'Are you sure you want to delete the prompt?'
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${prompt._id.toString()}`, {
                    method: 'DELETE',
                });

                const remainingPrompts = myPrompts.filter(
                    (p) => p._id !== prompt._id
                );
                setMyPrompts(remainingPrompts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={myPrompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
