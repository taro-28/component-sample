"use client";

import { Column as TanStackColumn } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props<T> = {
  column: TanStackColumn<T>;
};

export const ColumnHeader = <T,>({ column }: Props<T>) => (
  <Button
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    variant="ghost"
  >
    {column.id}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
