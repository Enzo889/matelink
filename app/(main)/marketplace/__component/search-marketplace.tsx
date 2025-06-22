import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchMarketplaceProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function SearchMarketplace({ searchTerm, onSearchChange }: SearchMarketplaceProps) {
  return (
    <div className="relative mx-8">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchMarketplace