import React from "react";
import HeaderChats from "./__components/headerChats";
import ChatRequest from "./__components/chat-request";
import MessageList from "./__components/message-list";

function page() {
  return (
    <div className="flex flex-col">
      {" "}
      <HeaderChats /> <ChatRequest /> <MessageList />{" "}
    </div>
  );
}

export default page;
