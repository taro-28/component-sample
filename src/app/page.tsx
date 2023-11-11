import * as React from "react";
import { DataTable } from "@/components/DataTable";
import { users } from "@/data/users";

export default function DataTableDemo() {
  return (
    <div className="mx-4 space-y-2">
      <h1 className="text-xl">Component Samples</h1>
      <div>
        <h2 className="text-lg">Data Table</h2>
        <DataTable data={users} />
      </div>
    </div>
  );
}
