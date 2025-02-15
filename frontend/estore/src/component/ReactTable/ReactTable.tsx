"use client"

import { useEffect, useState } from "react"
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, type SortingState } from "@tanstack/react-table"
import Modal from "../DeletePopOver/ModalBox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "react-toastify"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

export interface HasId {
  _id: string
}

const BasicTable = <T extends HasId>({ columns, data = [], deleteSelected, isSuccess, error, refetch }: any) => {
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({})
  const [modelOpen, setModelOpen] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows,
      sorting,
    },
    onRowSelectionChange: setSelectedRows,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleDelete = async () => {
    const ids = Object.keys(selectedRows).map((key: any) => data[key]._id)
    console.log("ids", ids)
    if (deleteSelected) {
      await deleteSelected({ ids } as any)
      refetch()
    }
    setModelOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted items")
    } else if (error) {
      toast.error(`error,${JSON.stringify(error)}`)
    }
  }, [isSuccess, error])

  return (
    <div className="w-[70%] mx-auto p-4 space-y-4">
      <div
        className={`top_header_actions px-4 py-2 bg-red-500 text-white rounded text-sm ml-auto w-fit ${
          Object.keys(selectedRows).length > 0 ? "visible" : "invisible"
        }`}
      >
        <button onClick={() => setModelOpen(true)}>Delete Selected</button>
      </div>

      <Modal
        onClose={() => setModelOpen(false)}
        isOpen={modelOpen}
        title={`Delete ${Object.keys(selectedRows).length} Items`}
      >
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-slate-600 transition-colors"
          onClick={handleDelete}
        >
          Confirm Delete
        </button>
      </Modal>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center space-x-2 ${
                          header.column.getCanSort() ? "cursor-pointer select-none" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span>
                            {header.column.getIsSorted() === "asc" ? (
                              <FaSortUp />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <FaSortDown />
                            ) : (
                              <FaSort />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={row.getToggleSelectedHandler()}
                key={row.id}
                className="hover:bg-slate-500/10 cursor-pointer transition-colors duration-200 ease-in-out"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BasicTable

