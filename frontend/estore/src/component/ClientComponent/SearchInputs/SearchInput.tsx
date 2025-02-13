import { Input } from '@/components/ui/input'
import React, { useDebugValue, useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'

import { useSearchProductMutation } from '@/src/store/rtkQuery';
import { useRouter } from 'next/navigation';

import DataDialog from '../DataDialog/DataDialog';


export default function SearchInput() {

    const [input,setInput] = useState();
    const [showModel, setShowModel] = useState(false);
    const [ searchFUnction , { data , isSuccess , isError , error } ] = useSearchProductMutation();

    const router = useRouter();

    useEffect( ()=>{

        if(isSuccess){
            setShowModel(true);
            setInput(null)
        }else{
            setShowModel(false);
        }

    } ,[isSuccess,isError,error])

    function handleChange(e){

        setInput(e.target.value)
        const id = setTimeout( ()=>{

            searchFUnction({keyword:e.target.value});

        } ,400);

    }

  return (
    <div className="hidden sm:block flex-1 max-w-md mx-4">
    <div className="relative">
      <Input
        onChange={ handleChange }
        value={input}
        onSubmit={handleChange}
        type="search"
        placeholder="Search..."
        className="w-full pl-10 pr-4 rounded-[10px] text-gray-500"
      />
      <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

        { data && showModel && <DataDialog products={data?.data} onClose={ ()=>setShowModel(false) } /> }

    </div>
  </div>
  )
}
