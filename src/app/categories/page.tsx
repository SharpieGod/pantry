import React from "react";
import Navbar from "~/components/Navbar";

const Categories = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-[#f4988f] p-8 min-h-screen">
        <section>
          <h2 className="text-2xl font-bold text-black mb-12">CATEGORIES</h2> {/* Increased margin-bottom to 12 */}
          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Canned Goods</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Pasta & Rice</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Cereals</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Condiments</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Snacks</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Baking Supplies</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Beverages</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Spices</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Dried Fruits & Nuts</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Categories;
