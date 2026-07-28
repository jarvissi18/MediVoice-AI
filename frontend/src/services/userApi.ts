import api from "./api";
import type { User } from "../types/user";

export interface CreateReceptionistData {
  full_name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  full_name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export interface CreateStaffData {
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export const createStaff = async (
  data: CreateStaffData
) => {
  const res = await api.post(
    "/users",
    data
  );

  return res.data;
};

export const updateUser = async (
  id: number,
  data: UpdateUserData
) => {
  const res = await api.put(
    `/users/${id}`,
    data
  );
  return res.data;
};

export const updateUserStatus = async (
  id: number,
  is_active: string
) => {
  const res = await api.patch(
    `/users/${id}/status`,
    {
      is_active,
    }
  );

  return res.data;
};

export const deleteUser = async (
  id: number
) => {
  const res = await api.delete(
    `/users/${id}`
  );

  return res.data;
};