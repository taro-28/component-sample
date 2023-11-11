import { faker } from "@faker-js/faker";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  avatar: string;
  birthdate: Date;
  link: string;
  groups: {
    id: string;
    name: string;
  }[];
  departments: string[];
};

const createUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 100 }),
  avatar: faker.image.avatarLegacy(),
  birthdate: faker.date.birthdate(),
  link: faker.internet.url(),
  departments: faker.helpers.multiple(() => faker.commerce.department()),
  groups: faker.helpers.multiple(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
  })),
});

export const users = faker.helpers.multiple(createUser, {
  count: 100,
});
