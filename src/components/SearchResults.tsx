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
      <ul>{results?.map((p) => <PostCard post={p} key={p.id} />)}</ul>
    </div>
  );
};

export default SearchResults;
