import React from 'react';
import Select from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface ReactSelectProps {
    name: string;
    setFieldValue: ( value:any,name:string )=>void;
    values:any
}


const ReactSelect: React.FC<ReactSelectProps> = ({  name ,setFieldValue = ()=> {} ,values}) => {


    const handleChange = ( option:any )=>{
        setFieldValue( name , option.value )
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    return (
        <Select
            name={name}
            options={options}
            onChange={ handleChange }
            placeholder={'Select an option'}
            className="w-full"
        />
    );
};

export default ReactSelect;