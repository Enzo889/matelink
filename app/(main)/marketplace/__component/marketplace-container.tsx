"use client";

import { useState } from "react";
import ItemsMarketplace from "./items";
import HeaderMarketplace from "./header";
import { categories } from "./data/category-data";

function MarketplaceContainer() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    location: "",
    condition: "any",
  });
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <HeaderMarketplace
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <ItemsMarketplace
        selectedCategory={selectedCategory}
        filters={{
          priceRange: filters.priceRange as [number, number],
          location: filters.location,
          condition: filters.condition,
        }}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default MarketplaceContainer;
