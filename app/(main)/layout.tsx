import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import AsideComponent from "./components/aside/aside-main";
import ButtonPost from "./components/button-post";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full bg-background  ">
      <nav className="w-[25%] h-screen  border-r-2   sticky top-0 left-0 max-md:hidden ">
        <Navbar />
      </nav>

      <main className="w-[45%] h-full max-md:w-full max-md:border-none ">
        {children}
      </main>

      <aside className="w-[30%] min-h-full  border-l-2  px-4 py-6   max-md:hidden  ">
        <AsideComponent />
      </aside>
      <ButtonPost />
    </div>
  );
}
