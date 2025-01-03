import React, { useRef } from 'react';
import { Field, FieldArray } from 'formik';
import { RxCross2 } from 'react-icons/rx';

interface TagComponentInterface {
  name: string;
  values: any;
  type:string
}

export default function TagComponent({ name, values ,type}: TagComponentInterface) {
  const inputRef = useRef<HTMLDivElement[]>([]); // Ref to manage tag elements

  const handleAddTag = (push: Function) => {
    push(''); // Add an empty tag
    setTimeout(() => {
      inputRef.current.forEach((item, index) => {
        if (index !== 0) {
          item?.classList.add('custom_tag'); // Add custom class to non-first tags
        }
      });
    }, 0); // Ensure DOM updates before applying class
  };

  const handleRemoveTag = (remove: Function, index: number) => {
    remove(index); // Remove the tag at the given index
    inputRef.current.splice(index, 1); // Remove the ref at the same index
  };

  return (
    <div className="tag_item_wrap">
      <FieldArray name={name}>
        {({ push, remove }) => (
          <>
            {values[name]?.map((item: any, index: number) => (
              <div
                ref={(el: any) => (inputRef.current[index] = el)}
                className="relative w-full"
                key={index}
              >
                <Field
                  name={`${name}[${index}]`}
                  type={type}
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTag(remove, index)}
                  className="absolute right-2 top-2"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddTag(push)}
              className="mt-2 px-4 py-2 bg-slate-500 text-white rounded-md"
            >
              Add {name}
            </button>
          </>
        )}
      </FieldArray>
    </div>
  );
}
