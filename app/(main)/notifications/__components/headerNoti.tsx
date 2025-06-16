import BackButton from "@/components/back-button";
import React from "react";

function HeaderNoti() {
  return (
    <div className="w-full flex flex-col backdrop-blur-3xl sticky top-0 right-0  border-b-2">
      <div className="flex items-center gap-4 p-4   ">
        <BackButton />
        <p className="text-xl font-semibold mb-3 ">Notifications</p>
      </div>
      <div className="flex w-full border-b ">
        <div className="flex-1  transition-colors ">
          <button className="w-full p-4 font-medium text-center cursor-pointer relative group hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50">
            All
            <div className="absolute bottom-0 left-1/2 w-14 h-1 bg-primary   transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        <div className="flex-1  transition-colors">
          <button className="w-full p-4 font-medium text-center cursor-pointer relative group hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50">
            Verificated
            <div className="absolute bottom-0 left-1/2 w-14 h-1 bg-primary  transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        <div className="flex-1  transition-colors">
          <button className="w-full p-4 font-medium text-center cursor-pointer relative group hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50">
            Mentions{" "}
            <div className="absolute bottom-0 left-1/2 w-14 h-1 bg-primary  transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderNoti;
