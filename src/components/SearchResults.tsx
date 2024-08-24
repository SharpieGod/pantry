"use client";
import { FoodCategory } from "@prisma/client";
import { type FC } from "react";
import { api } from "~/trpc/react";
import PostCard from "./PostCard";

interface SearchResultsProps {
  query: string;
  userId: string | undefined;
}

const SearchResults: FC<SearchResultsProps> = ({ query, userId }) => {
  const { data: results, isLoading } = api.post.searchPosts.useQuery({
    query,
    take: 12,
    exclude: "",
    userId: userId,
  });

  return (
    <div>
      <div className="mx-auto w-3/5">
        <h1 className="py-4 text-2xl">Results for {query}</h1>
        {isLoading && (
          <div className="w-full p-4 text-center text-lg">Loading...</div>
        )}
        <ul className="grid grid-cols-3 gap-8 *:w-full">
          {results?.map((p) => <PostCard post={p} key={p.id} />)}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
