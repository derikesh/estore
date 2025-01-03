import React, { useEffect } from 'react';
import Select from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface ReactSelectProps {
    name: string;
    setFieldValue: ( value:any,name:string )=>void;
    dataValue:any
}


const ReactSelect: React.FC<ReactSelectProps> = ({  name ,setFieldValue = ()=> {} ,dataValue =[]}) => {


    const handleChange = ( option:any )=>{
        setFieldValue( name , option.value )
    }

    let newOPtion = [];

   if(dataValue?.length>1){
     newOPtion =  dataValue?.map( (item:any)=>({
        value:item?._id,
        label:item?.name
    }) );
   }


    return (
        <Select
            name={name}
            options={newOPtion}
            onChange={ handleChange }
            placeholder={'Select an option'}
            className="w-full"
        />
    );
};

export default ReactSelect;