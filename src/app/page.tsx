import React from "react";
import Navbar from "~/components/Navbar";
import footer from "~/components/footer"; 
const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-[#f4988f] p-8">
        {/* Banner Section */}
        <section className="mb-8">
          <div className="relative h-60 flex items-center justify-center bg-[#f0b090] rounded-lg">
            {/* Placeholder for carousel images as rounded rectangles */}
            <div className="flex justify-center items-center space-x-4">
              <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
              <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
              <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
              <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
            </div>
            
            <div className="absolute left-2 text-black">
              <button>{`<`}</button>
            </div>
            <div className="absolute right-2 text-black">
              <button>{`>`}</button>
            </div>
            
            <div className="absolute bottom-2 flex justify-center">
              <span className="mx-1 bg-black p-1 rounded-full"></span>
              <span className="mx-1 bg-gray-300 p-1 rounded-full"></span>
              <span className="mx-1 bg-gray-300 p-1 rounded-full"></span>
              <span className="mx-1 bg-gray-300 p-1 rounded-full"></span>
            </div>
          </div>
        </section>

     
        <section>
          <h2 className="text-xl font-bold text-black mb-4">SUGGESTIONS</h2>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </section>
      </main>
      <footer /> 
    </div>
  );
};

export default Home;
