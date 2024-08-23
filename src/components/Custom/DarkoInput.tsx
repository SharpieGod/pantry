import { type FC } from "react";
import { cn } from "~/lib/utils";

interface DarkoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const DarkoInput: FC<DarkoInputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "invalid:animate-[shake_0.5s] invalid:border-red-500 invalid:text-red-500 invalid:focus:border-red-500",
        "placeholder:transition-colors focus:placeholder:text-text-200/50",
        "rounded border border-background-800 bg-transparent p-3 py-2 transition-colors placeholder:font-normal placeholder:text-text-200/60 focus:border-primary-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30",
        className,
      )}
      {...props}
    />
  );
};

export default DarkoInput;
