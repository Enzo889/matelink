import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

function SearchMarketplace() {
  return (
    <div className="relative mx-8">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        className="pl-10"
      />
    </div>
  )
}

export default SearchMarketplace