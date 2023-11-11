"use client";

import { Row as TanStackRow } from "@tanstack/react-table";

import { Checkbox } from "../ui/checkbox";

type Props<T> = {
  row: TanStackRow<T>;
};

export const SelectColumnCell = <T,>({ row }: Props<T>) => (
  <Checkbox
    aria-label="Select row"
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
  />
);
