export type Workspace = {
  _id: string;
  name: string;
  owner: string;
  isPersonal?: boolean;
};

export type CreateWorkspace = {
  name: string;
};
