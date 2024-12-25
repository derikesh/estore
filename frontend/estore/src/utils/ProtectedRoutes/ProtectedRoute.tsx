'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { tokenValidity } from '../AuthUtils/AuthUtil';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const router = useRouter();

    const {} = tokenValidity;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cookie = document.cookie;
            const token = cookie
                .split('; ')
                .find((item) => item.startsWith('acessToken='))
                ?.split('=')[1];

            if (!token) {
                console.log('No token found, redirecting to /admin');
                router.push('/admin');
                return;
            }

            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const nowDate = Math.floor(Date.now() / 1000); // Current time in seconds

                if (decodedToken.exp > nowDate) {
                    setIsValid(true); // Token is valid
                } else {
                    console.log('Token expired, redirecting to /admin');
                    router.push('/admin'); // Token expired
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                router.push('/admin'); // Invalid token format
            }
        }
    }, [router]);

    if (isValid === null) {
        return <div>Redirecting...</div>;
    }

    return <>{isValid == true ? "there is some token" : "no token"}{children}</>;
}
