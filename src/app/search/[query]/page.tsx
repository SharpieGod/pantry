import { FoodCategory } from "@prisma/client";
import { redirect } from "next/navigation";
import { type FC } from "react";
import { z } from "zod";
import Navbar from "~/components/Navbar";
import SearchResults from "~/components/SearchResults";
import { getServerAuthSession } from "~/server/auth";

interface NoFilterSearchPageProps {
  params: { query: string };
}

const NoFilterSearchPage: FC<NoFilterSearchPageProps> = async ({
  params: { query },
}) => {
  const session = await getServerAuthSession();

  return (
    <div>
      <Navbar search query={decodeURI(query)} />
      <SearchResults query={decodeURI(query)} userId={session?.user.id} />
    </div>
  );
};
export default NoFilterSearchPage;
