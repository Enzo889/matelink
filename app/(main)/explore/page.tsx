"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  Briefcase,
  Newspaper,
  Trophy,
  ShoppingBag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingTopics from "./__components/trending-topics";
import JobOffers from "./__components/job-offers";
import NewsSection from "./__components/news-section";
import SearchResults from "./__components/search-results";
import ProductOffers from "./__components/product-offers";

function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveSearch(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveSearch(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Search Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search posts, users, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 h-12 text-base rounded-full border-2 focus:border-primary"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Search Results or Main Content */}
      {activeSearch ? (
        <SearchResults query={searchQuery} onBack={clearSearch} />
      ) : (
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                News
              </TabsTrigger>
              <TabsTrigger value="sports" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Sports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-4">
              <TrendingTopics />
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <ProductOffers />
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <JobOffers />
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              <NewsSection category="politics" />
            </TabsContent>

            <TabsContent value="sports" className="space-y-4">
              <NewsSection category="sports" />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
