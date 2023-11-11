import { Table as TanStackTable } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

type Props<T> = {
  table: TanStackTable<T>;
};

export const SelectColumnHeader = <T,>({ table }: Props<T>) => (
  <Checkbox
    aria-label="Select all"
    checked={table.getIsAllPageRowsSelected()}
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  />
);
