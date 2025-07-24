import React from "react";
import HeaderNoti from "./__components/headerNoti";
import { NotificationsView } from "./__components/noti-view";

function NotificationPage() {
  return (
    <div className="flex flex-col ">
      <HeaderNoti />
      <NotificationsView />
    </div>
  );
}

export default NotificationPage;
