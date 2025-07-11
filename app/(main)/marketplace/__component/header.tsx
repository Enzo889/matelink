import React from 'react'
import BackButton from '@/components/back-button'
import Sell from './sell'
import Categories from './categories'
import FiltersMarketplace from './filters'
import SearchMarketplace from './search-marketplace'
import ShoppingCart from './cart'

import { CategoryType } from '@/types/tables.type';

interface HeaderMarketplaceProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  filters: {
    priceRange: number[];
    location: string;
    condition: string;
  };
  onFiltersChange: (filters: {
    priceRange: number[];
    location: string;
    condition: string;
  }) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function HeaderMarketplace({ categories, selectedCategory, onCategoryChange, filters, onFiltersChange, searchTerm, onSearchChange }: HeaderMarketplaceProps) {
  return (
    <header className='flex flex-col w-full h-fit p-2 border-b-2 gap-5'>
        <span className='flex flex-col gap-1.5  '>
            <span className='flex'>

        <div className='flex w-full items-start gap-4  '>
        <BackButton/>
        <p className='font-semibold text-2xl mt-0.5'>Marketplace</p>
        </div>
       <ShoppingCart/>
            </span>
        <SearchMarketplace 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
        </span>
        <div className='flex w-full justify-around'>
         <Sell/>
         <Categories 
           categories={categories}
           selectedCategory={selectedCategory}
           onCategoryChange={onCategoryChange}
         />
         <FiltersMarketplace 
           currentFilters={filters}
           onFiltersChange={onFiltersChange}
         />
        </div>
    </header>
  )
}

export default HeaderMarketplace