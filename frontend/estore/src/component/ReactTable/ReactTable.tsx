'use client'

import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
// import useRowSelection
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

interface TABLEPROP_INTERFACE {
  columns: ColumnDef<SINGLE_PRODUCT, any>[];
  data: SINGLE_PRODUCT[];
}

const ModernTable = ({ columns, data = [] }: TABLEPROP_INTERFACE) => {
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows,
    },
    onRowSelectionChange: setSelectedRows,   
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 space-y-4">
      <Button
        variant="destructive"
        disabled={Object.keys(selectedRows).length === 0}
        className="mb-4"
      >
        Delete Selected
      </Button>
      <div className="rounded-md border w-[70%] mx-auto">
        <div className="table_top_header" >
            <div>this is edit</div>
        </div>
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

export default ModernTable;

