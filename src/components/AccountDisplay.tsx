"use client";
import { type FC } from "react";
import Navbar from "./Navbar";

import PostCard from "./PostCard";
import PostCardEdit from "./PostCardEdit";
import { api } from "~/trpc/react";
import { Post } from "@prisma/client";

interface AccountDisplayProps {
  userId: string;
  isSelf: boolean;
}

const AccountDisplay: FC<AccountDisplayProps> = ({ userId, isSelf }) => {
  const { data: user, isLoading: userLoading } = api.user.getUser.useQuery({
    id: userId,
  });

  const { data: posts, isLoading: postsLoading } = api.post.listByUser.useQuery(
    {
      userId,
    },
  );

  return userLoading ? (
    <span>Loading...</span>
  ) : (
    <div>
      <div className="mx-auto w-3/5">
        <h1 className="py-4 text-2xl font-semibold opacity-80">
          {isSelf ? `Hello, ${user?.name}` : `${user?.name}'s profile`}
        </h1>
        {postsLoading ? (
          <span>Loading...</span>
        ) : (
          <ul className="flex flex-wrap items-center gap-8">
            {posts?.map((p) =>
              isSelf ? (
                <PostCardEdit post={p} key={p.id} />
              ) : (
                <PostCard post={p} key={p.id} />
              ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AccountDisplay;
