"use client";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { typedKeys } from "@/functions/object";
import { useState } from "react";
import { SelectColumnHeader } from "./SelectColumnHeader";
import { SelectColumnCell } from "./SelectColumnCell";
import { ColumnHeader } from "./ColumnHeader";
import { Cell } from "./Cell";

type Props<T> = {
  data: T[];
};

export function DataTable<T extends Record<string, unknown>>({
  data,
}: Props<T>) {
  const dataColumns: ColumnDef<T>[] = typedKeys(data[0]).map((key: string) => ({
    accessorKey: key,
    header: ColumnHeader,
    cell: ({ row }) => <Cell value={row.getValue(key)} />,
  }));

  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: SelectColumnHeader,
      cell: SelectColumnCell,
      enableSorting: false,
      enableHiding: false,
    },
    ...dataColumns,
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 py-4">
        <Input
          className="max-w-sm"
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
        />
        <Button
          onClick={() =>
            console.table(
              table.getSelectedRowModel().rows.map((row) => row.original),
            )
          }
          variant="outline"
        >
          log selection
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Visible Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  checked={column.getIsVisible()}
                  className="capitalize"
                  key={column.id}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
