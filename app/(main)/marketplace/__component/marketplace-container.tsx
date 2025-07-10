"use client";

import { useState, useEffect } from "react";
import ItemsMarketplace from "./items";
import HeaderMarketplace from "./header";
import { useCategories } from "./data/category-data";
import { CategoryType } from "@/types/tables.type";

function MarketplaceContainer() {
  const { categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    location: "",
    condition: "any",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const handleCategoryChange = (category: CategoryType) => {
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

  if (loading) {
    return <div className="p-8 text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error.message}</div>;
  }

  if (!selectedCategory) {
    return <div className="p-8 text-center">No categories found.</div>;
  }

  return (
    <div>
      <HeaderMarketplace
        categories={categories}
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
