import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Camera,
  Save,
  Lock,
} from "lucide-react";

import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

interface ProfileForm {
  full_name: string;
  email: string;
  role: string;
}

interface PasswordForm {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<ProfileForm>({
    full_name: "",
    email: "",
    role: "",
  });

  const [password, setPassword] = useState<PasswordForm>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

          const response = await api.put(
      "/auth/profile",
      {
        full_name: profile.full_name,
        email: profile.email,
      }
    );

    updateUser(response.data);

    toast.success(
      "Profile updated successfully."
    );
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (
      password.new_password !==
      password.confirm_password
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.put("/auth/change-password", password);

      toast.success("Password changed successfully.");

      setPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account information.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row">

          <div className="flex flex-col items-center">

            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-5xl font-bold text-white shadow-lg">
              {profile.full_name
                ? profile.full_name.charAt(0).toUpperCase()
                : "?"}
            </div>

            <button className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-100">
              <Camera size={18} />
              Change Photo
            </button>

          </div>

          <div className="grid flex-1 gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border px-4 py-3">

                <User size={18} />

                <input
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleProfileChange}
                  className="w-full outline-none"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="flex items-center gap-3 rounded-xl border px-4 py-3">

                <Mail size={18} />

                <input
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full outline-none"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4 py-3">

                <Shield size={18} />

                <input
                  value={profile.role}
                  disabled
                  className="w-full bg-transparent outline-none"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Joined
              </label>

              <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4 py-3">

                <Calendar size={18} />

                <input
                  disabled
                  value="Member"
                  className="w-full bg-transparent outline-none"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={saveProfile}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">

          <Lock size={22} />

          Change Password

        </h2>

        <div className="grid gap-6">

          <input
            type="password"
            name="current_password"
            placeholder="Current Password"
            value={password.current_password}
            onChange={handlePasswordChange}
            className="rounded-xl border px-4 py-3 outline-none"
          />

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={password.new_password}
            onChange={handlePasswordChange}
            className="rounded-xl border px-4 py-3 outline-none"
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={password.confirm_password}
            onChange={handlePasswordChange}
            className="rounded-xl border px-4 py-3 outline-none"
          />

          <div className="flex justify-end">

            <button
              onClick={changePassword}
              disabled={loading}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}