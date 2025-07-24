import style from "./chatRoom.module.css";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import MessageForm from "@/app/(afterLogin)/messages/[room]/_component/MessageForm";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { UserInfo } from "@/app/(afterLogin)/messages/[room]/_component/UserInfo";
// import WebSocketComponent from "@/app/(afterLogin)/messages/[room]/_component/WebSocketComponent";
import React from "react";
import MessageList from "@/app/(afterLogin)/messages/[room]/_component/MessageList";
import WebSocketComponent from "./_component/WebSocketComponent";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  params: { room: string };
};
export default async function ChatRoom({ params }: Props) {
  const { room } = await params;
  const session = await auth();
  const queryClient = new QueryClient();
  const ids = room.split("-").filter((v) => v !== session?.user?.email);
  if (!ids[0]) {
    return null;
  }
  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <MessageList id={ids[0]} />
      <MessageForm id={ids[0]} />
    </main>
  );
}
