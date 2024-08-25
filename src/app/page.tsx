import React from "react";
import Navbar from "~/components/Navbar";
import { SwipeCarousel } from "~/components/SwipeCarousel";
import { getServerAuthSession } from "~/server/auth";

const Home = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar search />

      <section className="bg-primary relative flex h-[50vh] items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 mx-auto max-w-xl text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">Share More, Waste Less</h1>
          <p className="mb-8 text-lg">
            Discover and share non-perishable food items in your community. Help
            reduce waste and make a difference.
          </p>
        </div>
      </section>

      <section className="bg-primary py-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">
          Recent Listings
        </h2>
        <div className="mx-auto max-w-6xl">
          <SwipeCarousel userId={session?.user.id} />
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-8 text-3xl font-semibold">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
