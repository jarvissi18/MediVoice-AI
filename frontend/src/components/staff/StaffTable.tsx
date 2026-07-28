import type { User } from "../../types/user";

interface Props {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Role</th>
            <th className="text-left p-4">Status</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4">
                {user.full_name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.role}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.is_active === "true"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.is_active === "true"
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  

                  {user.role !== "Administrator" && (
                  <button
                    onClick={() => onToggleStatus(user)}
                    className={`px-3 py-1 rounded text-white ${
                      user.is_active === "true"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.is_active === "true"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  )}

                  {user.role !== "Administrator" && (
                    <button
                      onClick={() => onDelete(user)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}