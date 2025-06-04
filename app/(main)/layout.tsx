import AsideComponent from "@/components/aside-main";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background ">
      <nav className="w-[25%] h-screen py-6">
        <Navbar />
      </nav>

      <main className="w-[45%] h-screen  border-x-2 overflow-y-auto px-6 py-4">
        {children}
      </main>

      <aside className="w-[30%] h-screen px-4 py-6">
        <AsideComponent />
      </aside>
    </div>
  );
}
