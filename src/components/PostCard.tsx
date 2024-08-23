"use client";
import { FoodCategory, Post } from "@prisma/client";
import Image from "next/image";
import { type FC } from "react";
import { FoodCategoryReadable } from "~/types";
import { useRef } from "react";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } =
      imageRef.current?.getBoundingClientRect() ?? {};
    const x = ((e.clientX - left!) / width!) * 30 - 15;
    const y = ((e.clientY - top!) / height!) * 30 - 15;

    imageRef.current!.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translate(0, 0) scale(1)";
    }
  };

  return (
    <Link
      className="relative flex h-72 w-80 flex-col gap-2"
      href={`/post/${post.id}`}
    >
      <div className="flex-1 overflow-hidden rounded-lg">
        {post.imageUrl ? (
          <Image
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
            src={post.imageUrl ?? ""}
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-300 ease-out"
          />
        ) : (
          <Image
            src={"/placeholder.webp"}
            className="h-full w-full object-cover"
            alt="placeholder"
            width={500}
            height={500}
          />
        )}
      </div>
      <div className="flex w-full flex-col text-lg">
        <span className="text-base text-text-50/80">
          {post.category ? FoodCategoryReadable[post.category] : "No Category"}
        </span>
        <div className="flex justify-between">
          <h1 className="">{post.title !== "" ? post.title : "<No title>"}</h1>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
