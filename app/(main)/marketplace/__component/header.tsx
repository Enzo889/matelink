import React from 'react'
import BackButton from '@/components/back-button'
import Sell from './sell'
import Categories from './categories'
import FiltersMarketplace from './filters'
import SearchMarketplace from './search-marketplace'
import ShoppingCart from './cart'

interface HeaderMarketplaceProps {
  selectedCategory: { id: number; name: string };
  onCategoryChange: (category: { id: number; name: string }) => void;
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
}

function HeaderMarketplace({ selectedCategory, onCategoryChange, filters, onFiltersChange }: HeaderMarketplaceProps) {
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
        <SearchMarketplace/>
        </span>
        <div className='flex w-full justify-around'>
         <Sell/>
         <Categories 
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