"use client";
import { useRouter } from "next/navigation";
import { type FC } from "react";

interface SearchBoxProps {
  query: string;
}

const SearchBox: FC<SearchBoxProps> = ({ query }) => {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        router.push("/account");
      }}
    >
      <input type="text" />
    </form>
  );
};

export default SearchBox;
