"use client";
import { FoodCategory } from "@prisma/client";
import { api } from "~/trpc/react";
import PostCard from "./PostCard";

const CategoryPreviews = () => {
  const { data: ret, isLoading } = api.post.getPreviews.useQuery();

  return isLoading ? (
    <></>
  ) : (
    <ul className="mx-auto flex w-2/3 flex-wrap gap-8">
      {ret &&
        Object.values(ret).map(
          (c) =>
            c.length > 0 && (
              <div className="flex gap-8">
                {c.map((p) => p && <PostCard post={p} />)}
              </div>
            ),
        )}
    </ul>
  );
};

export default CategoryPreviews;
