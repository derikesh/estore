'use client'

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "../DeletePopOver/ModalBox";
import { SINGLE_PRODUCT } from "../AdminComponents/Product/ReadProduct";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { CATEGORY_INTERFACE } from "../AdminComponents/Category/PostCategory";

export interface HasId {
  _id: string; 
}


const BasicTable = <T extends HasId>({ columns, data = [] , deleteSelected , isSuccess,error,isError, refetch }: any) => {
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [modelOpen, setModelOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows,
    },
    onRowSelectionChange: setSelectedRows,   
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete =async () => {
    const ids = Object.keys(selectedRows).map((key:any) => data[key]._id);
    console.log("ids",ids);
    if(deleteSelected){
      await deleteSelected({ids} as any);
    };
    setModelOpen(false);
  };

  useEffect( ()=>{

    if(isSuccess){
      toast.success("Successfully deleted items");
    }else if(error){
      toast.error(`error,${JSON.stringify(error)}`)
    }

  } ,[isSuccess,error,isError])

  return (
    <div className="w-[70%] mx-auto p-4 space-y-4">

      <div className={`top_header_actions px-4 py-2 bg-red-500 text-white rounded text-sm ml-auto w-fit ${Object.keys(selectedRows).length > 0 ? 'visible' : 'invisible'}`}>
        <button onClick={ ()=>setModelOpen(true) } >Deleted Selected</button>
      </div>

    <Modal onClose={ ()=>setModelOpen(false) } isOpen={modelOpen} title={`Delete ${Object.keys(selectedRows).length} Items`} >
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-slate-600 transition-colors" onClick={handleDelete} >Confim Delete</button>
     </Modal> 

      <div className="rounded-md border">       
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow onClick={ row.getToggleSelectedHandler() } key={row.id} className="hover:bg-slate-500/10 cursor-pointer transition-colors duration-200 ease-in-out ">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BasicTable;

