"use client";

import {
  Newspaper,
  Clock,
  TrendingUp,
  MessageCircle,
  Share,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NewsSectionProps {
  category: "politics" | "sports";
}

function NewsSection({ category }: NewsSectionProps) {
  const politicsNews = [
    {
      id: 1,
      title: "New Climate Policy Announced by Government",
      summary:
        "Major environmental reforms set to reduce carbon emissions by 40% over the next decade.",
      source: "Political Times",
      time: "2 hours ago",
      image: "https://picsum.photos/400/200?random=1",
      trending: true,
      engagement: { likes: 234, comments: 45, shares: 67 },
    },
    {
      id: 2,
      title: "Economic Recovery Plan Shows Promising Results",
      summary:
        "Latest quarterly reports indicate significant improvement in employment rates and GDP growth.",
      source: "Economic Daily",
      time: "4 hours ago",
      image: "https://picsum.photos/400/200?random=2",
      trending: false,
      engagement: { likes: 189, comments: 32, shares: 41 },
    },
    {
      id: 3,
      title: "International Trade Agreement Reached",
      summary:
        "Historic deal between major economies promises to boost global commerce and cooperation.",
      source: "Global News",
      time: "6 hours ago",
      image: "https://picsum.photos/400/200?random=3",
      trending: true,
      engagement: { likes: 456, comments: 78, shares: 123 },
    },
    {
      id: 4,
      title: "Education Reform Initiative Launched",
      summary:
        "New program aims to modernize curriculum and improve access to quality education nationwide.",
      source: "Education Weekly",
      time: "8 hours ago",
      image: "https://picsum.photos/400/200?random=4",
      trending: false,
      engagement: { likes: 167, comments: 29, shares: 34 },
    },
  ];

  const sportsNews = [
    {
      id: 1,
      title: "Championship Final Set for This Weekend",
      summary:
        "Two powerhouse teams prepare for the most anticipated match of the season.",
      source: "Sports Central",
      time: "1 hour ago",
      image: "https://picsum.photos/400/200?random=5",
      trending: true,
      engagement: { likes: 892, comments: 156, shares: 234 },
    },
    {
      id: 2,
      title: "Record-Breaking Performance in Olympic Trials",
      summary:
        "Young athlete shatters 20-year-old record, securing spot for upcoming international competition.",
      source: "Olympic News",
      time: "3 hours ago",
      image: "https://picsum.photos/400/200?random=6",
      trending: true,
      engagement: { likes: 567, comments: 89, shares: 145 },
    },
    {
      id: 3,
      title: "Major League Trade Shakes Up Season",
      summary:
        "Unexpected player transfer creates new dynamics in championship race.",
      source: "League Insider",
      time: "5 hours ago",
      image: "https://picsum.photos/400/200?random=7",
      trending: false,
      engagement: { likes: 334, comments: 67, shares: 89 },
    },
    {
      id: 4,
      title: "New Stadium Opens with Spectacular Ceremony",
      summary:
        "State-of-the-art facility promises enhanced fan experience and world-class events.",
      source: "Stadium News",
      time: "7 hours ago",
      image: "https://picsum.photos/400/200?random=8",
      trending: false,
      engagement: { likes: 445, comments: 78, shares: 112 },
    },
  ];

  const news = category === "politics" ? politicsNews : sportsNews;
  const categoryTitle =
    category === "politics" ? "Political News" : "Sports News";
  const categoryIcon = category === "politics" ? Newspaper : TrendingUp;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {categoryIcon === Newspaper ? (
            <Newspaper className="w-5 h-5 text-primary" />
          ) : (
            <TrendingUp className="w-5 h-5 text-primary" />
          )}
          <h2 className="text-xl font-bold">{categoryTitle}</h2>
        </div>
        <Button variant="outline" size="sm">
          View All News
        </Button>
      </div>

      <div className="grid gap-4">
        {news.map((article) => (
          <Card
            key={article.id}
            className="hover:shadow-md transition-shadow cursor-pointer group overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={200}
                  className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="md:w-2/3">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.source}
                        </Badge>
                        {article.trending && (
                          <Badge
                            variant="destructive"
                            className="text-xs animate-pulse"
                          >
                            Trending
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{article.time}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{article.engagement.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{article.engagement.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="w-4 h-4" />
                        <span>{article.engagement.shares}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* News Stats */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">
                Articles Today
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-sm text-muted-foreground">Breaking News</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">89K</div>
              <div className="text-sm text-muted-foreground">Total Reads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">45</div>
              <div className="text-sm text-muted-foreground">Sources</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewsSection;
