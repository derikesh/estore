import Link from 'next/link'
import React from 'react'

interface LINK_INTERFACE {
    result:any
}

export default function SideFilter({result}:any) {
    return (
        <div className='pt-16 flex flex-col gap-4' >
            <Link href={'/all'} >All Item</Link>

            {result?.map((item) => (
                <Link href={`/all/${item?._id}`} key={item._id} > {item.name}</Link>
            ))}
        </div>
    )
}
