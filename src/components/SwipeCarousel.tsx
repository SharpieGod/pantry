"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { api } from "~/trpc/react"; 
import { Post } from "@prisma/client";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const { data: posts = [] } = api.post.recentPosts.useQuery({ take: 6 });

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === posts.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [posts.length]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < posts.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  const handleImageClick = (direction: "left" | "right") => {
    if (direction === "right" && imgIndex < posts.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (direction === "left" && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex justify-center overflow-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`, // Move one post at a time
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex w-[80%] cursor-grab items-center active:cursor-grabbing" 
      >
        <Images imgIndex={imgIndex} posts={posts} onClick={handleImageClick} />
      </motion.div>

      {/* Left Arrow */}
      <button
        onClick={() => handleImageClick("left")}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white"
      >
        <FaArrowLeft size={30} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => handleImageClick("right")}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white"
      >
        <FaArrowRight size={30} />
      </button>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} length={posts.length} />
    </div>
  );
};

const Images = ({
  imgIndex,
  posts,
  onClick,
}: {
  imgIndex: number;
  posts: Post[];
  onClick: (direction: "left" | "right") => void;
}) => {
  return (
    <>
      {posts.map((post, idx) => {
        return (
          <motion.div
            key={post.id}
            style={{
              backgroundImage: `url(${post.imageUrl || '/placeholder.webp'})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="relative aspect-video w-full shrink-0 rounded-xl bg-neutral-800 object-cover"
          >
            {/* Display the post title or other details */}
            <div className="absolute bottom-4 left-4 text-white">
              <h2>{post.title}</h2>
            </div>

            {/* Clickable areas for navigating left and right */}
            <div
              onClick={() => onClick("left")}
              className="absolute bottom-0 left-0 top-0 w-1/2 cursor-pointer"
            />
            <div
              onClick={() => onClick("right")}
              className="absolute bottom-0 right-0 top-0 w-1/2 cursor-pointer"
            />
          </motion.div>
        );
      })}
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
  length,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  length: number;
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 mx-auto mt-4 flex justify-center gap-2">
      {Array.from({ length }).map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};
