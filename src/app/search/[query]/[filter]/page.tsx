import { FoodCategory } from "@prisma/client";
import { redirect } from "next/navigation";
import { type FC } from "react";
import { z } from "zod";
import Navbar from "~/components/Navbar";
import SearchResults from "~/components/SearchResults";

interface SearchPageProps {
  params: { query: string; filter?: string };
}

const SearchPage: FC<SearchPageProps> = ({ params: { query, filter } }) => {
  const parsedFilter = z.nativeEnum(FoodCategory).nullable().safeParse(filter);

  if (!parsedFilter.success) return redirect(`/search/${query}/`);

  const validFilter = parsedFilter.data;

  return (
    <div>
      <Navbar search query={decodeURI(query)} filter={validFilter} />
      <SearchResults query={decodeURI(query)} filter={validFilter} />
    </div>
  );
};
export default SearchPage;
