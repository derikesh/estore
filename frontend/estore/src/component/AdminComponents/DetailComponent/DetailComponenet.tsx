import React, { useEffect, useState } from 'react'
import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page'
import Image from 'next/image'

// formik imports 
import DetailForm from './DetailForm'
import { Button } from '@/components/ui/button'
import Modal from '../../DeletePopOver/ModalBox'
import { useAddFeaturesMutation } from '@/src/store/rtkQuery'
import { toast } from 'react-toastify'

interface DETAIL_INTERFACE {
    requireData: PRODUCT_INTERFACE,
    id: string,
    refetch: () => any
}

export interface FEATURE_INTERFACE {
    name:string,
    x:number,
    y:number
}

export default function DetailComponenet({ requireData, id, refetch }: DETAIL_INTERFACE) {

    const [positions, setpositions] = useState<FEATURE_INTERFACE[]>([]);

    const [modelOpen, setModelOpen] = useState(false);

    const [remove, setRemove] = useState(false);

    const [addFeatures, { isSuccess, isError, error }] = useAddFeaturesMutation();

    useEffect(() => {

        setpositions(requireData?.features);

    }, [requireData]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(`Features ${remove ? 'removed' : 'added'} successfully`);
        } else if (isError) {
            toast.error(`Error: ${JSON.stringify(error)}`)
        }
    }, [isSuccess, isError, error])


    function handleClick(e: any) {
        const parent = e.currentTarget.getBoundingClientRect();
        let name: ''
        const x = ((e.clientX - parent.left) / parent.width) * 100;
        const y = ((e.clientY - parent.top) / parent.height) * 100;
        setpositions((prev) => [...prev, {name,x:x - 2, y:y - 2}])
    }

    const handleDelete = async () => {

        await addFeatures({ id: requireData?._id, remove: remove });
        refetch();
        setModelOpen(false);
    }

    return (
        <div>
            <div className='detail_demo_content' >
                Click on any poistion of image to describe it
            </div>

            <div
                className={`top_header_actions px-4 py-2 bg-red-500 text-white rounded text-sm ml-auto w-fit `}
            >
                <button onClick={() => {
                    setModelOpen(true)
                    setRemove(true);
                }}>Remove Product Feature</button>
            </div>

            <Modal
                onClose={() => setModelOpen(false)}
                isOpen={modelOpen}
                title={`Conform Remove `}
            >
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-slate-600 transition-colors"
                    onClick={handleDelete}
                >
                    Remove {requireData?.name} Features
                </button>
            </Modal>


            <div className='content_select_points flex items-center gap-16' >
                <div className='h-[700px] w-[700px] relative image_wraper' onClick={handleClick} >
                    <Image
                        src={requireData?.images?.imageUrl}
                        height={700}
                        width={700}
                        alt={requireData?._id}
                    />
                    {positions?.length >= 1 && positions?.map((item, index) => {

                        if (index > 4) {
                            return;
                        }

                        return (
                            (
                                <div style={{
                                    left: `${item.x}%`,
                                    top: `${item.y}%`,
                                    position: 'absolute',
                                    // transform: 'translate(-50%, -50%)', // Center the point
                                    backgroundColor: 'black', // For visibility
                                    color: 'white',
                                    borderRadius: "50%",
                                    padding: '2px 8px',
                                    // borderRadius: '4px',
                                }} >
                                    {index + 1}
                                </div>
                            )
                        )
                    })}

                </div>
                <DetailForm setRemove={setRemove} data={requireData} addFeatures={addFeatures} setPositions={setpositions} id={id} positions={positions} />

            </div>

        </div>
    )
}
