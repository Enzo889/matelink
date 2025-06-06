import AsideComponent from "@/components/aside-main";
import Navbar from "@/components/navbar";
import { ScrollContainer } from "@/hooks/whellRef";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background  ">
      <nav className="w-[25%] h-full py-6  ">
        <Navbar />
      </nav>


      <main className="w-[45%] h-full  border-x-2  ">
<ScrollContainer>
        {children}
</ScrollContainer>
      </main>

      <aside className="w-[30%] h-full px-4 py-6  ">
        <AsideComponent />
      </aside>
    </div>
  );
}
