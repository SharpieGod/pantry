import React from "react";
import Navbar from "~/components/Navbar";
import SearchBox from "~/components/SearchBox";

const Home = () => {
  return (
    <div>
      <Navbar search />
      <h1 className="py-8 text-center text-4xl font-semibold">
        Share More, Waste Less
      </h1>
    </div>
  );
};

export default Home;
