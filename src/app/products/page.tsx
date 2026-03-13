"use client";

import { useState } from "react";
import { pushToDataLayer } from "@/components/DataLayerPush";

const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, category: "electronics", rating: 4.5 },
  { id: 2, name: "USB-C Cable", price: 12.99, category: "electronics", rating: 4.0 },
  { id: 3, name: "Notebook Set", price: 8.99, category: "office", rating: 4.8 },
  { id: 4, name: "Desk Lamp", price: 34.99, category: "office", rating: 4.2 },
  { id: 5, name: "Coffee Mug", price: 14.99, category: "lifestyle", rating: 4.7 },
  { id: 6, name: "Water Bottle", price: 19.99, category: "lifestyle", rating: 4.3 },
];

export default function Products() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = products
    .filter((p) => filter === "all" || p.category === filter)
    .sort((a, b) => (sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name)));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-500 self-center">Category:</span>
          {["all", "electronics", "office", "lifestyle"].map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded-full text-sm capitalize transition ${
                filter === cat ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => {
                setFilter(cat);
                pushToDataLayer("filter_change", { filter_category: cat });
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-500 self-center">Sort:</span>
          <select
            className="border rounded px-3 py-1 text-sm"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              pushToDataLayer("sort_change", { sort_by: e.target.value });
            }}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
              Product Image
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
              {product.category}
            </span>
            <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
            <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
              {"★".repeat(Math.floor(product.rating))}
              <span className="text-gray-400 ml-1">{product.rating}</span>
            </div>
            <p className="text-blue-600 font-bold text-xl mt-2">${product.price}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
                onClick={() => {
                  pushToDataLayer("add_to_cart", {
                    product_id: product.id,
                    product_name: product.name,
                    product_price: product.price,
                    product_category: product.category,
                  });
                  alert(`Added ${product.name} to cart!`);
                }}
              >
                Add to Cart
              </button>
              <button
                className="px-3 py-2 border rounded hover:bg-gray-100 transition text-sm"
                onClick={() => {
                  pushToDataLayer("add_to_wishlist", {
                    product_id: product.id,
                    product_name: product.name,
                  });
                  alert(`Added ${product.name} to wishlist!`);
                }}
              >
                ♡
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
