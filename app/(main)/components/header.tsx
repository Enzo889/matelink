import React from "react";

function HeaderComp() {
  return (
    <div className="flex w-full border-b ">
      <div className="flex-1  transition-colors border-r-2">
        <button className="w-full p-4 font-medium text-center cursor-pointer relative group">
          For you
          <div className="absolute bottom-0 left-1/2 w-14 h-1 bg-primary   transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
      <div className="flex-1  transition-colors">
        <button className="w-full p-4 font-medium text-center cursor-pointer relative group">
          Following
          <div className="absolute bottom-0 left-1/2 w-14 h-1 bg-primary  transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

export default HeaderComp;
