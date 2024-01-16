import { api } from "../api";
import { CreateMember } from "../models/memberModel";

export const addMember = async (createMembers: CreateMember) => {
  await api.post(`/members/${createMembers.workspace}`, createMembers);
};
