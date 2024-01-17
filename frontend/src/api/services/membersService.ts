import { api } from "../api";
import { User } from "../models";
import { CreateMember } from "../models/memberModel";

export const addMember = async (createMembers: CreateMember) => {
  await api.post(`/members/${createMembers.workspace}/${createMembers.login}`);
};

export const getMembers = async (workspaceId: string) => {
  const { data: members } = await api.get<User[]>(`/members/${workspaceId}`);
  return members;
};
