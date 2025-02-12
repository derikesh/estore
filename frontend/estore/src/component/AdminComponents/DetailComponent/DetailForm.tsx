import { ErrorMessage, Field, Form, Formik,FieldArray} from 'formik'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';

import { useAddFeaturesMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';

interface DETAI_FORM_INTERFACE {
    positions:[number,number][],
    id:string
}

export default function DetailForm({positions,id}:DETAI_FORM_INTERFACE) {

    console.log("from the form",id);

    const [addFeatures,{ isSuccess,isError,error }] = useAddFeaturesMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('added features successfully');
        } else if (isError) {
            toast.error(`error:${JSON.stringify(error)}`);  // Clear message on error
        }
    }, [isSuccess, isError]);

    return (
        <>
        <Formik
            initialValues={{
                features:[ {name:"",x:'',y:''} ]
            }}
            onSubmit={(values) => {
                console.log("what the value",values.features);
                addFeatures({newFeatures:values.features,id});
            }}
        >
            {({ isSubmitting, setFieldError, setFieldValue, values }) => {

                    useEffect(  
                        ()=>{
                            if(positions.length<=5){
                                setFieldValue( "features",positions.map( (item)=>({name:"",x:item[0],y:item[1]}) ) );
                            }else{
                                return;
                            }
                        } , [positions]
                    )

                return(
                    <Form>
                        <div>
                          <FieldArray name='features' >
                            { ({push,remove})=>(
                                <>
                                
                                    { values.features.map( (_,idx)=>(
                                        <div className='mb-4' key={idx} >
                                            <label className='bg-black px-2 rounded-full mr-4 text-white' >{idx+1}</label>
                                            <Field name={`features.${idx}.name`} />
                                            <ErrorMessage name={`features.${idx}.name`}/>
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
