import React, { useEffect, useState } from 'react'
import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page'
import Image from 'next/image'

// formik imports 
import DetailForm from './DetailForm'

interface DETAIL_INTERFACE {
    requireData: PRODUCT_INTERFACE,
    id:string
}

export default function DetailComponenet({ requireData,id }: DETAIL_INTERFACE) {

    const [positions, setpositions] = useState([]);

    function handleClick(e: any) {
        const parent = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - parent.left) / parent.width) * 100;
        const y = ((e.clientY - parent.top) / parent.height) * 100;
        setpositions( (prev)=>[...prev , [x-2,y-2]] )
    }

    return (
        <div>
            <div className='detail_demo_content' >
                Click on any poistion of image to describe it
            </div>

            <div className='content_select_points grid grid-cols-2' >
                <div className='relative image_wraper' onClick={handleClick} >
                    <Image
                        src={requireData?.images?.imageUrl}
                        height={700}
                        width={700}
                        alt={requireData?._id}
                    />
                    {positions?.length >= 1 && positions?.map( (item,index)=>{

                        if (index > 4){
                            return ;
                        }

                        return (
                            (
                                <div style={{
                                    left: `${item[0]}%`,
                                    top: `${item[1]}%`,
                                    position: 'absolute',
                                    // transform: 'translate(-50%, -50%)', // Center the point
                                    backgroundColor: 'black', // For visibility
                                    color: 'white',
                                    borderRadius:"50%",
                                    padding: '2px 8px',
                                    // borderRadius: '4px',
                                }} >
                                    {index+1}
                            </div>
                            )
                        )
                    } )}
                    
                </div>

               <DetailForm id={id} positions={positions} />

            </div>

        </div>
    )
}
