import React from 'react'
import { Field, FieldArray } from 'formik'
import { useRef } from 'react'


interface TagComponentInterface {
    name:string,
    values:any
}

const initalValue = {
    inputFiled:"",
    tagItems:[]
}

export default function TagComponent( {name,values}:TagComponentInterface ) {

    console.log("ssss", values[name]);
    

    const inputRef = useRef<any[]>([]);

    const handleClick = (push:Function)=>{
        push("");
        inputRef?.current?.map( (item)=>{
            if(item){
                item.classList.add("custome_tag");
                
            }
    } )
        console.log("from the form",inputRef?.current);
    }


  return (

    <div className='tag_item_wrap' >
        <FieldArray
        name={name}
        >
            { ({push , remove})=>(
                <div>
                    { values[name]?.map( (item:any,index:number)=>(
                        <div key={index} >
                            <Field
                            innerRef={ (el:any)=>inputRef.current[index] = el 
                            }
                            name={`${name}[${index}]`}
                            
                            type="text"
                            className="border border-black p-4"
                            />

                            <button onClick={ ()=>{
                                remove(index);
                                inputRef.current.slice(index,1);
                            } } >
                                remove
                            </button>

                        </div>
                    ) ) }
                    <button onClick={ ()=>handleClick(push) } >add</button>
                </div>
            ) }

        </FieldArray>
    </div>

  )
}
