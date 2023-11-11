"use client";

import * as React from "react";
import { DataTable } from "@/components/DataTable";
import { faker } from "@faker-js/faker";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  avatar: string;
  birthdate: Date;
};

const createUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 100 }),
  avatar: faker.image.avatarLegacy(),
  birthdate: faker.date.birthdate(),
});

const data: User[] = faker.helpers.multiple(createUser, {
  count: 100,
});

export default function DataTableDemo() {
  return (
    <div className="mx-4 space-y-2">
      <h1 className="text-xl">Component Samples</h1>
      <div>
        <h2 className="text-lg">Data Table</h2>
        <DataTable data={data} />
      </div>
    </div>
  );
}
