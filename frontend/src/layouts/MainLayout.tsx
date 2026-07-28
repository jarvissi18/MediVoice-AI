import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Fixed Sidebar */}

      <div className="fixed left-0 top-0 z-40 h-screen w-72">
        <Sidebar />
      </div>

      {/* Content */}

      <div className="ml-72 flex min-h-screen flex-1 flex-col">

        {/* Navbar */}

        <Navbar />

        {/* Main */}

        <main className="flex-1 overflow-y-auto bg-slate-50">

          <div className="mx-auto max-w-[1700px] p-8 lg:p-10">

            <div className="page-enter">

              <Outlet />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}