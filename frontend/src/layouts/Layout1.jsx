import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
export default function Layout1() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}