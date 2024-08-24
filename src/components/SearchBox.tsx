"use client";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";

interface SearchBoxProps {
  query: string;
}

const SearchBox: FC<SearchBoxProps> = ({ query }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(query);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        router.push(`/search/${searchText}/test`);
      }}
    >
      <input
        placeholder="Search"
        type="text"
        value={searchText}
        className="w-full"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
