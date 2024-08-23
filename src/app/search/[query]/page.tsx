import { type FC } from "react";
import Navbar from "~/components/Navbar";
import SearchResults from "~/components/SearchResults";

interface pageProps {
  params: { query: string };
}

const page: FC<pageProps> = ({ params: { query } }) => {
  return (
    <div>
      <Navbar search query={query} />
      <SearchResults query={query} filter={null} />
    </div>
  );
};

export default page;
