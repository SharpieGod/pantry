import React from "react";
import Navbar from "~/components/Navbar";
import { SwipeCarousel } from "~/components/SwipeCarousel";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar search />

      <section className="relative flex items-center justify-center h-[50vh] bg-cover bg-center bg-primary" >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white max-w-xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Share More, Waste Less</h1>
          <p className="text-lg mb-8">
            Discover and share non-perishable food items in your community. Help reduce waste and make a difference.
          </p>
        </div>
      </section>

      <section className="bg-primary py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Recent Listings</h2>
        <div className="max-w-6xl mx-auto">
          <SwipeCarousel />
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              {/* <img src="/step1.png" alt="Step 1" className="mx-auto mb-4" /> */}
              <h3 className="text-xl font-semibold">Step 1: Search</h3>
              <p>Find the items you need from available listings.</p>
            </div>
            <div>
              {/* <img src="/step2.png" alt="Step 2" className="mx-auto mb-4" /> */}
              <h3 className="text-xl font-semibold">Step 2: Connect</h3>
              <p>Get in touch with the lister to arrange a pickup.</p>
            </div>
            <div>
              {/* <img src="/step3.png" alt="Step 3" className="mx-auto mb-4" /> */}
              <h3 className="text-xl font-semibold">Step 3: Share</h3>
              <p>List your unwanted items to help others.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
