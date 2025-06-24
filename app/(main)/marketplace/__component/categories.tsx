"use client"
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { categories } from "./data/category-data";
import { ArrowDownIcon } from "lucide-react";


interface CategoriesProps {
  onCategoryChange: (category: { id: number; name: string }) => void;
  selectedCategory: { id: number; name: string };
}

function Categories({ onCategoryChange, selectedCategory }: CategoriesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Button 
          asChild 
          className="cursor-pointer"
          variant={"outline"}
        >
          <PopoverTrigger><ArrowDownIcon/> {selectedCategory.name}</PopoverTrigger>
        </Button>
        <PopoverContent className="w-fit">
          <div className="flex flex-col">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory.id === category.id ? "default" : "ghost"}
                className="cursor-pointer"
                onClick={() => {
                  onCategoryChange(category);
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
