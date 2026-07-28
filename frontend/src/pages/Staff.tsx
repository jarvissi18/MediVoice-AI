import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import UserForm from "../components/staff/StaffForm";
import type { UserFormData } from "../components/staff/StaffForm";
import UserTable from "../components/staff/StaffTable";
import UserModal from "../components/staff/StaffModal";
import UserStats from "../components/staff/StaffStats";
import UserSearch from "../components/staff/StaffSearch";

import {
  getUsers,
  createStaff,
  updateUser,
  deleteUser,
  updateUserStatus,
} from "../services/userApi";

import type { User } from "../types/user";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  

  const [editingUser, setEditingUser] =
    useState<User | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [staffRole, setStaffRole] = useState<
  "Receptionist" | "Doctor"
>("Receptionist");

const [showMenu, setShowMenu] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
  const keyword = search.toLowerCase();

  return (
    user.full_name.toLowerCase().includes(keyword) ||
    user.email.toLowerCase().includes(keyword)
  );
});

const totalUsers = users.length;

const activeUsers = users.filter(
  (user) => user.is_active === "true"
).length;

const inactiveUsers = users.filter(
  (user) => user.is_active === "false"
).length;

  const handleCreate = async (
    data: UserFormData
  ) => {
    try {
      await createStaff({
        ...data,
        role: staffRole,
      });

      toast.success("Receptionist created");

      loadUsers();
    } catch {
      toast.error("Unable to create receptionist");
    }
  };

  const handleUpdate = async (
    data: UserFormData
  ) => {
    if (!editingUser) return;

    try {
      await updateUser(editingUser.id, {
        full_name: data.full_name,
        email: data.email,
      });

      toast.success("User updated");

      setEditingUser(null);

      loadUsers();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (
    user: User
  ) => {
    const ok = window.confirm(
      `Delete ${user.full_name}?`
    );

    if (!ok) return;

    try {
      await deleteUser(user.id);

      toast.success("User deleted");

      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggle = async (
    user: User
  ) => {
    try {
      await updateUserStatus(
        user.id,
        user.is_active === "true"
          ? "false"
          : "true"
      );

      toast.success("Status updated");

      loadUsers();
    } catch {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold">
                Users
            </h1>

            <div className="relative">

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Staff ▼
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg">

                <button
                  onClick={() => {
                    setStaffRole("Receptionist");
                    setEditingUser(null);
                    setOpenModal(true);
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                >
                  👩 Add Receptionist
                </button>

                <button
                  onClick={() => {
                    setStaffRole("Doctor");
                    setEditingUser(null);
                    setOpenModal(true);
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                >
                  👨‍⚕️ Add Doctor
                </button>

              </div>
            )}

          </div>

        </div>

        <UserStats
            total={totalUsers}
            active={activeUsers}
            inactive={inactiveUsers}
            />

        <UserSearch
            value={search}
            onChange={setSearch}
            />

    <UserModal
    open={openModal}
    title={
        editingUser
        ? "Edit Receptionist"
        : "Add Receptionist"
    }
    onClose={() => {
        setOpenModal(false);
        setEditingUser(null);
    }}
    >

    <UserForm
        isEdit={!!editingUser}
        initialData={
        editingUser
            ? {
                full_name: editingUser.full_name,
                email: editingUser.email,
                password: "",
            }
            : undefined
        }
        onSubmit={async (data) => {
        if (editingUser) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }

        setOpenModal(false);
        setEditingUser(null);
        }}
        onCancel={() => {
        setOpenModal(false);
        setEditingUser(null);
        }}
    />

    </UserModal>

        
      <UserTable
        users={filteredUsers}
        loading={loading}
        onEdit={(user) => {
            setEditingUser(user);
            setOpenModal(true);
        }}
        onDelete={handleDelete}
        onToggleStatus={handleToggle}
        />
    </div>
  );
}