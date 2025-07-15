import BackButton from "@/components/back-button";
import React from "react";

function HeaderChatSettings() {
  return (
    <div className="w-full flex items-start p-4 pb-0 gap-2 border-b-2 ">
      <BackButton />
      <p className="text-2xl font-bold">Chat Settings</p>
    </div>
  );
}

export default HeaderChatSettings;
