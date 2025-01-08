import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface ReactSelectProps {
    name: string;
    setFieldValue: (value: any, name: string) => void;
    dataValue: any;
    dynamicValue?: string; 
}

const ReactSelect: React.FC<ReactSelectProps> = ({ name, setFieldValue = () => {}, dataValue = [], dynamicValue }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        
        if (dynamicValue) {
            const initialOption = dataValue?.find((item: any) => item?._id === dynamicValue);
            if (initialOption) {
                setSelectedOption({
                    value: initialOption?._id,
                    label: initialOption?.name,
                });
            }
        }
    }, [dynamicValue, dataValue]); 

    const handleChange = (option: any) => {
        setSelectedOption(option);
        setFieldValue(name, option?.value); 
    };

    const newOptions: Option[] = dataValue?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
    })) || [];

    return (
        <Select
            name={name}
            value={selectedOption}
            options={newOptions}
            onChange={handleChange}
            placeholder={'Select an option'}
            className="w-full"
        />
    );
};

export default ReactSelect;
