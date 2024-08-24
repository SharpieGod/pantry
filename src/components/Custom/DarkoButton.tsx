"use client";
import { useState } from "react";
import { type FC } from "react";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

interface DarkoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

const DarkoButton: FC<DarkoButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  const [animation, setAnimation] = useState({ x: 0, y: 0, key: 0 });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnimation({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      key: Date.now(),
    });
  };

  return (
    <div onClick={handleClick}>
      <button
        {...props}
        className={cn(
          "relative overflow-hidden",
          "rounded-lg p-5 py-2 text-lg transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30",
          {
            "bg-red-500/80": variant === "danger",
            "hover:bg-red-500/60": variant === "danger" && !props.disabled,

            "bg-primary-300 text-text-900": variant === "primary",
            "hover:bg-primary-300/90": variant === "primary" && !props.disabled,

            "bg-accent-900": variant === "secondary",
            "hover:bg-accent-900/80":
              variant === "secondary" && !props.disabled,

            "hover:bg-background-900/50":
              variant === "ghost" && !props.disabled,
          },
          className,
        )}
      >
        {!props.disabled && (
          <motion.span
            key={animation.key}
            initial={{
              scale: 0.2,
              opacity: animation.key === 0 ? 0 : 0.4,
              top: animation.y,
              left: animation.x,
              x: "-50%",
              y: "-50%",
            }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute size-32 rounded-full bg-white"
          ></motion.span>
        )}
        {children}
      </button>
    </div>
  );
};

export default DarkoButton;
