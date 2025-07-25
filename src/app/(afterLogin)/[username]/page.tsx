import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";

import { auth } from "@/auth";
import { User } from "@/model/User";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const user: User = await getUserServer({
    queryKey: ["users", username],
  } as any);
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
    openGraph: {
      title: `${user.nickname} (${user.id}) / Z`,
      description: `${user.nickname} (${user.id}) 프로필`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`,
          width: 400,
          height: 400,
        },
      ],
    },
  };
}

export default async function Profile(props: Props) {
  const { username } = await props.params;
  const queryClient = new QueryClient();
  const session = await auth();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", "recommends"],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
