"use client";
import { FoodCategory, Post } from "@prisma/client";
import Image from "next/image";
import { type FC } from "react";
import { FoodCategoryReadable } from "~/types";
import { useRef } from "react";

interface PostCardEditProps {
  post: Post;
}

const PostCardEdit: FC<PostCardEditProps> = ({ post }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } =
      imageRef.current?.getBoundingClientRect() || {};
    const x = ((e.clientX - left!) / width!) * 30 - 15; // Adjust the multiplier for a stronger/weaker effect
    const y = ((e.clientY - top!) / height!) * 30 - 15;

    imageRef.current!.style.transform = `translate(${x}px, ${y}px) scale(1.1)`; // Parallax and zoom effect
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translate(0, 0) scale(1)"; // Reset on mouse leave
    }
  };

  return (
    <div className="relative flex h-60 w-96 flex-col gap-2">
      <div className="overflow-hidden rounded-lg">
        {post.imageUrl ? (
          <Image
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
            src={post.imageUrl ?? ""}
            alt=""
            width={500}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 ease-out"
          />
        ) : (
          <Image
            src={"/placeholder.webp"}
            alt="placeholder"
            width={500}
            height={400}
          />
        )}
      </div>
      <div className="flex w-full justify-between text-lg">
        <h1 className="">{post.title !== "" ? post.title : "<No title>"}</h1>
        <span>
          {post.category ? FoodCategoryReadable[post.category] : "No Category"}
        </span>
      </div>
    </div>
  );
};

export default PostCardEdit;
