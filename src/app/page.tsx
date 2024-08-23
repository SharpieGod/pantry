import React from "react";
import Footer from "~/components/footer";
import Navbar from "~/components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-[#f4988f] p-8">
        {/* Banner Section */}
        <section className="mb-8">
          <div className="relative flex h-60 items-center justify-center rounded-lg bg-[#f0b090]">
            {/* Placeholder for carousel images as rounded rectangles */}
            <div className="flex items-center justify-center space-x-4">
              <div className="h-48 w-48 rounded-lg bg-gray-200"></div>
              <div className="h-48 w-48 rounded-lg bg-gray-200"></div>
              <div className="h-48 w-48 rounded-lg bg-gray-200"></div>
              <div className="h-48 w-48 rounded-lg bg-gray-200"></div>
            </div>

            <div className="absolute left-2 text-black">
              <button>{`<`}</button>
            </div>
            <div className="absolute right-2 text-black">
              <button>{`>`}</button>
            </div>

            <div className="absolute bottom-2 flex justify-center">
              <span className="mx-1 rounded-full bg-black p-1"></span>
              <span className="mx-1 rounded-full bg-gray-300 p-1"></span>
              <span className="mx-1 rounded-full bg-gray-300 p-1"></span>
              <span className="mx-1 rounded-full bg-gray-300 p-1"></span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-black">SUGGESTIONS</h2>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
