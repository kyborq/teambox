import { Role } from "./roleModel";

export type User = {
  _id: string;
  login: string;
  name: string;
  role: Role;
};
