import { type FC } from "react";
import { cn } from "~/lib/utils";

interface DarkoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
  className?: string;
}

const DarkoTextarea: FC<DarkoTextareaProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn(
        "placeholder:transition-colors focus:placeholder:text-text-200/50",
        "w-full rounded border border-primary-800 bg-transparent p-3 py-2 transition-colors placeholder:text-primary-200/60 focus:border-primary-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default DarkoTextarea;
