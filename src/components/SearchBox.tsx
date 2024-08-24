"use client";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { FoodCategoryReadable } from "~/types";
import SelectElement, { SelectElementOption } from "./Custom/SelectElement";

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

        router.push(`/search/${searchText}`);
      }}
      className="grid grid-cols-3 items-center gap-2"
    >
      <input
        placeholder="Search"
        type="text"
        value={searchText}
        className="col-span-2"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
