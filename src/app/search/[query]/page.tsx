import { type FC } from "react";
import Navbar from "~/components/Navbar";
import SearchResults from "~/components/SearchResults";

interface pageProps {
  params: { query: string };
}

const page: FC<pageProps> = ({ params: { query } }) => {
  return (
    <div>
      <Navbar />
      <SearchResults query="eggs" filter={null} />
    </div>
  );
};

export default page;
