import { QueryFunction } from "@tanstack/query-core";
import { User } from "@/model/User";
import { cookies } from "next/headers";

export const getUserServer: QueryFunction<
  User,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },
      credentials: "include",
      headers: { Cookie: (await cookies()).toString() },
      cache: "no-store",
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
