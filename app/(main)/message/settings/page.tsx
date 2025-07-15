import React from "react";
import HeaderChatSettings from "./__components/header-chat-settings";
import AllowMessages from "./__components/allow-messages";

function page() {
  return (
    <div className="flex flex-col">
      <HeaderChatSettings />
      <AllowMessages />
    </div>
  );
}

export default page;
