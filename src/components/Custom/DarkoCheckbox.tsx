"use client";
import { type FC, useId } from "react";
import { cn } from "~/lib/utils";
import { FaCheck } from "react-icons/fa6";

interface DarkoCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const DarkoCheckbox: FC<DarkoCheckboxProps> = ({ className, ...props }) => {
  const checkId = useId();

  return (
    <div>
      <label
        htmlFor={props.id ?? checkId}
        className={cn(
          "darko__checkbox",
          "relative block size-6 rounded border border-background-800 transition-colors",
          className,
        )}
      >
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-background-950 transition-transform">
          <FaCheck size={16} />
        </div>
      </label>
      <input
        id={props.id ?? checkId}
        {...props}
        type="checkbox"
        aria-hidden
        className="invisible hidden"
      />
    </div>
  );
};

export default DarkoCheckbox;
