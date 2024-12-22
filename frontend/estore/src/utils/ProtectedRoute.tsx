'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const [ isValue , setIsValid ] = useState<boolean | null>(null);

    const router = useRouter();

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const tokenExists = localStorage.getItem('estoretoken');
            console.log( "token exists",tokenExists );

            if (tokenExists === null) {
                router.push('/admin')
            }else{
                setIsValid(true);
            }
        }

    }, []);

    if(isValue === null){
        return <div>Redircting...</div>
    }

    return (
        <>
        {children}
        </>
    )
}
