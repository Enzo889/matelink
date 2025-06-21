"use client"

import { useState } from "react";
import ItemsMarketplace from "./items";
import HeaderMarketplace from "./header";
import { categories } from "./data/category-data";

function MarketplaceContainer() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    location: "",
    condition: "new"
  });

  const handleCategoryChange = (category: { id: number; name: string }) => {
    setSelectedCategory(category);
  };

  const handleFiltersChange = (newFilters: {
    priceRange: number[];
    location: string;
    condition: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <HeaderMarketplace 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <ItemsMarketplace 
        selectedCategory={selectedCategory}
        filters={filters}
      />
    </div>
  );
}

export default MarketplaceContainer;