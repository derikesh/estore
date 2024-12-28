'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { tokenValidity } from '../AuthUtils/AuthUtil';
import { useRefreshTokenMutation } from '@/src/store/rtkQuery';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const router = useRouter();

    const [refreshToken] = useRefreshTokenMutation();

    // Check token validity on initial render
    useEffect( ()=>{
        const callRefresh = async ()=>{            
            try{
                await tokenValidity(refreshToken, router);
                setIsValid(true);
            }catch(err:any){
                setIsValid(false);
                router.push('/admin');
                console.log("Error invoking function:",err.message)
            }
        };

        callRefresh();

    } ,[refreshToken])
 
    if (isValid === null || isValid === false) {
        return <div>Redirecting...</div>;
    }

    return <>{isValid == true ? "there is some token" : "no token"}{children}</>;
}
