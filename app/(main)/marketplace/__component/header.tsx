import BackButton from '@/components/back-button'
import React from 'react'
import Sell from './sell'
import Categories from './categories'
import FiltersMarketplace from './filters'

function HeaderMarketplace() {
  return (
    <header className='flex flex-col w-full h-fit p-2 border-b-2'>
        <div className='flex w-full items-start gap-4 '>
        <BackButton/>
        <p className='font-semibold text-2xl mt-0.5'>Marketplace</p>
        </div>
        <div className='flex w-full justify-around'>
         <Sell/>
         <Categories/>
         <FiltersMarketplace/>
        </div>
    </header>
  )
}

export default HeaderMarketplace