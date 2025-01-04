import React, { useEffect } from 'react';
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
    const handleChange = (option: any) => {
        setFieldValue(name, option.value);
    };

    let newOptions: Option[] = [];

    if (dataValue?.length > 1) {
        newOptions = dataValue?.map((item: any) => ({
            value: item?._id,
            label: item?.name,
        }));
    }

    // Find the default option based on dynamicValue
    const defaultOption = newOptions.find(option => option.value === dynamicValue);

    return (
        <Select
            name={name}
            defaultValue={defaultOption}
            options={newOptions}
            onChange={handleChange}
            placeholder={'Select an option'}
            className="w-full"
        />
    );
};

export default ReactSelect;