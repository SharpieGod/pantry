import { FoodCategory } from "@prisma/client";
import { type FC } from "react";
import Navbar from "~/components/Navbar";
import SearchResults from "~/components/SearchResults";

interface pageProps {
  params: { query: string; filter: FoodCategory | null };
}

const page: FC<pageProps> = ({ params: { query, filter } }) => {
  return (
    <div>
      <Navbar search query={decodeURI(query)} filter={filter} />
      <span>{filter}</span>
      <SearchResults query={decodeURI(query)} filter={null} />
    </div>
  );
};

export default page;
