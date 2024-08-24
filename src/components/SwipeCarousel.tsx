"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// fetch postings from db later
const imgs = [
  "/placeholder.webp",
  "/placeholder.webp",
  "/placeholder.webp",
  "/placeholder.webp",
  "/placeholder.webp",
  "/placeholder.webp",
];

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

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && imgIndex < imgs.length - 1) {
        setImgIndex((prev) => prev + 1);
      } else if (event.key === "ArrowLeft" && imgIndex > 0) {
        setImgIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imgIndex]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  const handleImageClick = (direction: "left" | "right") => {
    if (direction === "right" && imgIndex < imgs.length - 1) {
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
          translateX: `-${imgIndex * 100}%`, // Move one image at a time
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex w-[80%] cursor-grab items-center active:cursor-grabbing" // Occupies 80% width for better centering
      >
        <Images imgIndex={imgIndex} onClick={handleImageClick} />
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

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
};

const Images = ({
  imgIndex,
  onClick,
}: {
  imgIndex: number;
  onClick: (direction: "left" | "right") => void;
}) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="relative aspect-video w-full shrink-0 rounded-xl bg-neutral-800 object-cover"
          >
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
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 mx-auto mt-4 flex justify-center gap-2">
      {imgs.map((_, idx) => {
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
