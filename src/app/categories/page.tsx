import React from "react";
import Navbar from "~/components/Navbar";

const Categories = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-[#f4988f] p-8 min-h-screen">
        <section>
          <h2 className="text-2xl font-bold text-black mb-12">CATEGORIES</h2>
          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Vegetables</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Fruit</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Dairy</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Meat</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Seafood</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Grains</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Legumes</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Nuts and Seeds</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Herbs and Spices</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Oils and Fats</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Beverages</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Sweets and Confections</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Baked Goods</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Condiments</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Fermented Foods</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Processed Foods</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Cereals</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Pastas and Noodles</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Soups and Stews</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Frozen Foods</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Canned Foods</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Snacks</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Eggs & Poultry</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Alternative Proteins</h3>
              <div className="h-96 w-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Categories;
