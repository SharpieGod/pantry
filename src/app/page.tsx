import React from "react";
import Navbar from "~/components/Navbar";
import SearchBox from "~/components/SearchBox";
import { SwipeCarousel } from "~/components/SwipeCarousel";

const Home = () => {
  return (
    <div>
      <Navbar search />
      <h1 className="py-8 text-center text-4xl font-semibold">
        Share More, Waste Less
      </h1>
      <SwipeCarousel />
    </div>
  );
};

export default Home;
