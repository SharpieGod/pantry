"use client";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { api } from "~/trpc/react";
import { FoodCategoryReadable } from "~/types";
import { IoMailOutline } from "react-icons/io5";
import DarkoButton from "./Custom/DarkoButton";
import PostCard from "./PostCard";

interface PostDisplayProps {
  id: string;
}

const PostDisplay: FC<PostDisplayProps> = ({ id }) => {
  const { data: postData, isLoading: postLoading } = api.post.getPost.useQuery({
    id,
  });

  const { data: relatedData, isLoading: relatedLoading } =
    api.post.searchPosts.useQuery({
      query: postData?.title ?? "",
      take: 3,
      exclude: postData?.id ?? "",
    });

  return postLoading ? (
    <div className="w-full p-4 text-center text-lg">Loading...</div>
  ) : (
    <div className="mx-auto flex w-3/5 flex-col gap-4 pt-4">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-semibold">{postData?.title}</h1>
        <Link
          href={`/account/${postData?.userId}`}
          className="flex items-center gap-2 text-xl text-text-50/80"
        >
          <span>Posted by {postData?.user.name}</span>
          <Image
            width={32}
            height={32}
            src={postData?.user.image ?? ""}
            alt={postData?.user.name ?? ""}
            className="rounded-full"
          />
        </Link>
      </div>

      <span className="text-lg opacity-80">
        Category:{" "}
        {postData?.category ? FoodCategoryReadable[postData.category] : ""}
      </span>

      <div className="flex gap-8">
        <Image
          width={1000}
          height={1000}
          className="max-h-[700px] w-[700px] rounded-lg object-cover"
          src={postData?.imageUrl ?? ""}
          alt={postData?.title ?? ""}
        />

        <a href={`mailto:${postData?.user.email}`} className="h-fit">
          <DarkoButton
            variant="primary"
            className="flex h-10 w-32 items-center justify-center gap-2"
          >
            <span>Contact</span>
            <IoMailOutline className="" size={32} />
          </DarkoButton>
        </a>
      </div>
      <div className="absolute bottom-8 left-1/2 flex w-3/5 -translate-x-1/2 flex-col gap-2">
        <h1 className="text-xl opacity-80">Related</h1>
        {relatedLoading ? (
          <div className="w-full text-center text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4 *:w-full">
            {relatedData?.map((p) => <PostCard post={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
