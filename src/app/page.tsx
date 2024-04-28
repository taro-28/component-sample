import Link from "next/link";
import * as React from "react";

export default function DataTableDemo() {
  return (
    <div className="mx-4 space-y-2">
      <h1 className="text-xl">Component Samples</h1>
      <ul>
        <li>
          <Link href="/data-table">Data Table</Link>
        </li>
        <li>
          <Link href="/editor">Editor</Link>
        </li>
      </ul>
    </div>
  );
}
