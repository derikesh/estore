import { ErrorMessage, Field, Form, Formik,FieldArray} from 'formik'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';

import { useAddFeaturesMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';

import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page';

interface DETAI_FORM_INTERFACE {
    positions:[number,number][],
    id:string,
    data:PRODUCT_INTERFACE,
    setpositions:any
}

export default function DetailForm({positions,id,data,setpositions}:DETAI_FORM_INTERFACE) {


    const [addFeatures,{ isSuccess,isError,error }] = useAddFeaturesMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('added features successfully');
        } else if (isError) {
            toast.error(`error:${JSON.stringify(error)}`);  // Clear message on error
        }
    }, [isSuccess, isError]);

    const initalValue = {
        features: data?.features?.length
            ? data.features.map(f => ({
                name: f.name || "",   
                x: f.x || 0,          
                y: f.y || 0           
              }))
            : [{ name: "", x: 0, y: 0 }] 
    }


  
    return (
        <>
        <Formik
            enableReinitialize
            initialValues={initalValue}
            onSubmit={(values) => {
                console.log("what the value",values.features);
                addFeatures({newFeatures:values.features,id});
            }}
        >
            {({ isSubmitting, setFieldError, setFieldValue, values }) => {

                     useEffect(() => {
                    if (positions.length <= 5) {
                        setFieldValue("features", positions.map((p:any,index) => ({ name: data?.features?.[index]?.name, x: p?.[0], y: p?.[1] })));
                    }
                }, [positions, setFieldValue]);

                function handleRemove(name){
                    const newPositions = values.features.filter( (item:any) =>item.name != name );
                    setpositions(newPositions);
                }
            

                return(
                    <Form>
                        <div>
                          <FieldArray name='features' >
                            { ({push,remove})=>(
                                <>
                                
                                    { values?.features?.map( (item,idx)=>(
                                        <div className='mb-4' key={idx} >
                                            <label className='bg-black px-2 rounded-full mr-4 text-white' >{idx+1}</label>
                                            <Field name={`features.${idx}.name`} />
                                            <ErrorMessage name={`features.${idx}.name`}/>
                                            <div onClick={ ()=>{
                                                remove(idx);
                                                handleRemove(item?.name);
                                            } } >Remove</div>
                                        </div>
                                    ) ) }
    
                                </>
                            ) }
                           </FieldArray> 
                        </div>
                        <Button
                        type='submit'
                        disabled={isSubmitting}
                        variant='buttonPrimary'
                        className={`${positions.length >= 1 ? 'opacity-1' : 'opacity-0'} rounded-[10px]`}
                        >
                        Submit
                        </Button>
                    </Form>
                )
            }}
        </Formik>
        </>
    )
}
