import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-72">
        <Sidebar />
      </aside>

      {/* Right Side */}
      <div className="ml-72 flex h-screen flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="shrink-0">
          <Navbar />
        </header>

        {/* Page */}
        <main className="flex-1 overflow-hidden bg-slate-50">
          <div className="h-full p-8 lg:p-10">
            {/* IMPORTANT */}
            <div className="h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}