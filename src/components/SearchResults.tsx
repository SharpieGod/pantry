"use client";
import { FoodCategory } from "@prisma/client";
import { type FC } from "react";
import { api } from "~/trpc/react";
import PostCard from "./PostCard";

interface SearchResultsProps {
  query: string;
  filter: FoodCategory | null;
}

const SearchResults: FC<SearchResultsProps> = ({ query, filter }) => {
  const { data: results, isLoading } = api.post.searchPosts.useQuery({
    query,
    filter,
  });

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      <div className="mx-auto w-3/5">
        <h1 className="pb-4 text-2xl">Results for {query}</h1>
        <ul className="grid grid-cols-3 gap-8 *:w-full">
          {results?.map((p) => <PostCard post={p} key={p.id} />)}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
