import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    id: string;
    name: string;
    onChange?: ( e:React.ChangeEvent<HTMLInputElement> )=>void ;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, id, name, onChange }:InputFieldProps) => {
    return (
        <div className="py-2 px-8  text-black">
            <Label>
                {label}
            </Label>

            <Input
                onChange={onChange}
                id={id}
                name={name}
                value={value}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type={type}
            />
        </div>
    );
};

export default InputField;
