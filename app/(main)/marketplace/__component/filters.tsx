"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import NumberFlow from "@number-flow/react";

interface FiltersMarketplaceProps {
  onFiltersChange: (filters: {
    priceRange: number[];
    location: string;
    condition: string;
  }) => void;
  currentFilters: {
    priceRange: number[];
    location: string;
    condition: string;
  };
}

function FiltersMarketplace({
  onFiltersChange,
  currentFilters,
}: FiltersMarketplaceProps) {
  const [priceRange, setPriceRange] = useState(currentFilters.priceRange);
  const [location, setLocation] = useState(currentFilters.location);
  const [condition, setCondition] = useState(currentFilters.condition);
  const [open, setOpen] = useState(false);

  const handleApplyFilters = () => {
    onFiltersChange({
      priceRange,
      location,
      condition,
    });
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <Button asChild className="cursor-pointer">
          <PopoverTrigger>
            {" "}
            <SlidersHorizontalIcon /> Filters
          </PopoverTrigger>
        </Button>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-6 p-4">
            {/* Condition Filter */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Condition</h4>
              <RadioGroup
                defaultValue="any"
                value={condition}
                onValueChange={setCondition}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">Any</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="like-new" id="like-new" />
                  <Label htmlFor="like-new">Like New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="used" id="used" />
                  <Label htmlFor="used">Used</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Price Range</h4>
              <div className="pt-4">
                <Slider
                  defaultValue={[0, 100]}
                  value={priceRange}
                  max={1000}
                  step={10}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm ">
                  <span>
                    $<NumberFlow value={priceRange[0]} />
                  </span>
                  <span>
                    $<NumberFlow value={priceRange[1]} />{" "}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Location</h4>
              <Input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Apply Filters Button */}
            <Button
              className="w-full mt-2 cursor-pointer"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FiltersMarketplace;
