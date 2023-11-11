"use client";

import * as React from "react";
import { DataTable } from "@/components/DataTable";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  stringArray: string[];
  object: {
    id: string;
    name: string;
  };
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
    stringArray: ["todo1", "todo2"],
    object: {
      id: "m5gr84i9",
      name: "ken99",
    },
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    stringArray: ["todo1", "todo2"],
    object: {
      id: "3u1reuv4",
      name: "Abe45",
    },
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
    stringArray: ["todo1", "todo2"],
    object: {
      id: "derv1ws0",
      name: "Monserrat44",
    },
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
    stringArray: ["todo1", "todo2"],
    object: {
      id: "5kma53ae",
      name: "Silas22",
    },
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
    stringArray: ["todo1", "todo2"],
    object: {
      id: "bhqecj4p",
      name: "carmella",
    },
  },
];

export default function DataTableDemo() {
  return <DataTable data={data} />;
}
