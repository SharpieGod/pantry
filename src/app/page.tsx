import React from "react";
import CategoryPreviews from "~/components/CategoryPreviews";
import Navbar from "~/components/Navbar";
import SearchBox from "~/components/SearchBox";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="mx-auto w-3/5">
        <SearchBox query="" />
      </main>
      <CategoryPreviews />
    </div>
  );
};

export default Home;
