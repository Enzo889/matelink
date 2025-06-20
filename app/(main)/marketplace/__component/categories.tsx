"use client"
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

// Define categories data array
const categories = [
  { id: 1, name: "All Products" },
  { id: 2, name: "Fashion & Apparel" },
  { id: 3, name: "Electronics & Gadgets" },
  { id: 4, name: "Home & Living" },
  { id: 5, name: "Health & Beauty" },
  { id: 6, name: "Sports & Fitness" },
  { id: 7, name: "Books & Media" },
  { id: 8, name: "Art & Crafts" },
  { id: 9, name: "Food & Beverages" },
  { id: 10, name: "Toys & Games" },
  { id: 11, name: "Automotive & Tools" },
  { id: 12, name: "Pet Supplies" },
  { id: 13, name: "Travel & Luggage" },
  { id: 14, name: "Musical Instruments" },
  { id: 15, name: "Office & Stationery" },
] as const;

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Button 
          asChild 
          className="cursor-pointer"
        >
          <PopoverTrigger>{selectedCategory.name}</PopoverTrigger>
        </Button>
        <PopoverContent className="w-fit">
          <div className="flex flex-col">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory.id === category.id ? "default" : "ghost"}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category as typeof categories[0]);
                  setIsOpen(false);
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Categories;
