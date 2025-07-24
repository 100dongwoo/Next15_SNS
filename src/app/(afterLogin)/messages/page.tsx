import { auth } from "@/auth";
import style from "./message.module.css";
import Room from "@/app/(afterLogin)/messages/_component/Room";
import { getRooms } from "./[room]/_lib/getRooms";

export default async function Home() {
  const session = await auth();
  const rooms = session?.user?.email
    ? await getRooms(session?.user?.email)
    : [];
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      {rooms.map((room) => {
        return <Room key={room.room} room={room} />;
      })}
    </main>
  );
}
