import AsideComponent from "@/components/aside-main";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background  ">
      <nav className="w-[25%] h-full py-6 fixed top-0 left-0 ">
        <Navbar />
      </nav>

      <main className="w-[45%] h-full  border-x-2  fixed top-0 left-[25%] right-[30%] overflow-y-auto scrollbar-hide scroll-smooth ">
        {children}
      </main>

      <aside className="w-[30%] h-full px-4 py-6 fixed top-0 right-0 overflow-y-auto ">
        <AsideComponent />
      </aside>
    </div>
  );
}
