import { FoodCategory } from "@prisma/client";
import { redirect } from "next/navigation";
import { type FC } from "react";
import { z } from "zod";
import Navbar from "~/components/Navbar";
import SearchResults from "~/components/SearchResults";

interface NoFilterSearchPageProps {
  params: { query: string };
}

const NoFilterSearchPage: FC<NoFilterSearchPageProps> = ({
  params: { query },
}) => {
  return (
    <div>
      <Navbar search query={decodeURI(query)} filter={null} />
      <SearchResults query={decodeURI(query)} filter={null} />
    </div>
  );
};
export default NoFilterSearchPage;
