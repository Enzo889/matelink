"use client";

import { useState } from "react";
import {
  TrendingUp,
  Hash,
  MessageCircle,
  Eye,
  Users,
  Flame,
  Zap,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function TrendingTopics() {
  const [timeFilter, setTimeFilter] = useState<"1h" | "24h" | "7d">("24h");

  const trendingTopics = [
    {
      id: 1,
      hashtag: "ReactJS",
      posts: "45.2K",
      trend: "+12%",
      trendValue: 12,
      category: "Technology",
      description: "Latest React 19 features and updates",
      engagement: 89,
      views: "2.1M",
      participants: "15.3K",
      isHot: true,
      rank: 1,
      hourlyGrowth: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42],
    },
    {
      id: 2,
      hashtag: "WorldCup",
      posts: "128K",
      trend: "+45%",
      trendValue: 45,
      category: "Sports",
      description: "FIFA World Cup discussions and highlights",
      engagement: 95,
      views: "5.8M",
      participants: "89.2K",
      isHot: true,
      rank: 2,
      hourlyGrowth: [10, 15, 25, 35, 45, 55, 65, 75, 85, 90, 95, 100],
    },
    {
      id: 3,
      hashtag: "RemoteWork",
      posts: "32.1K",
      trend: "+8%",
      trendValue: 8,
      category: "Career",
      description: "Remote work opportunities and tips",
      engagement: 67,
      views: "890K",
      participants: "12.7K",
      isHot: false,
      rank: 3,
      hourlyGrowth: [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    },
    {
      id: 4,
      hashtag: "AI",
      posts: "89.5K",
      trend: "+23%",
      trendValue: 23,
      category: "Technology",
      description: "Artificial Intelligence news and developments",
      engagement: 78,
      views: "3.2M",
      participants: "34.5K",
      isHot: true,
      rank: 4,
      hourlyGrowth: [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52],
    },
    {
      id: 5,
      hashtag: "Startup",
      posts: "21.3K",
      trend: "+15%",
      trendValue: 15,
      category: "Business",
      description: "Startup funding and entrepreneurship",
      engagement: 72,
      views: "1.1M",
      participants: "8.9K",
      isHot: false,
      rank: 5,
      hourlyGrowth: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
    },
    {
      id: 6,
      hashtag: "Climate",
      posts: "67.8K",
      trend: "+19%",
      trendValue: 19,
      category: "Environment",
      description: "Climate change and sustainability discussions",
      engagement: 81,
      views: "2.4M",
      participants: "23.1K",
      isHot: false,
      rank: 6,
      hourlyGrowth: [4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37],
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Sports:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Career:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Business:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Environment:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  const getTrendColor = (value: number) => {
    if (value >= 30) return "text-red-500";
    if (value >= 15) return "text-orange-500";
    return "text-green-500";
  };

  const filteredTopics = trendingTopics.sort(
    (a, b) => b.trendValue - a.trendValue
  );

  return (
    <div className="space-y-6">
      {/* Header with Time Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <TrendingUp className="w-5 h-5 text-primary" />
            <Flame className="w-3 h-3 text-orange-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold">What&apos;s Trending</h2>
        </div>

        <div className="flex items-center gap-2">
          {(["1h", "24h", "7d"] as const).map((period) => (
            <Button
              key={period}
              variant={timeFilter === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter(period)}
              className="cursor-pointer"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Top 3 Trending - Featured Layout */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {filteredTopics.slice(0, 3).map((topic, index) => (
          <Card
            key={topic.id}
            className={`hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
              index === 0
                ? "ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                : ""
            }`}
          >
            {/* Rank Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge
                variant={index === 0 ? "default" : "secondary"}
                className="font-bold"
              >
                #{index + 1}
              </Badge>
            </div>

            {/* Hot Badge */}
            {topic.isHot && (
              <div className="absolute top-3 right-3 z-10">
                <Badge variant="destructive" className="animate-pulse">
                  <Flame className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              </div>
            )}

            <CardHeader className="pt-12 pb-3">
              <div className="flex items-center gap-0 mb-2">
                <Hash className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {topic.hashtag}
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                className={getCategoryColor(topic.category)}
              >
                {topic.category}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {topic.description}
              </p>

              {/* Engagement Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className="font-medium">{topic.engagement}%</span>
                </div>
                <Progress value={topic.engagement} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{topic.posts}</div>
                    <div className="text-xs text-muted-foreground">posts</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{topic.views}</div>
                    <div className="text-xs text-muted-foreground">views</div>
                  </div>
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {topic.participants}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1 font-bold ${getTrendColor(
                    topic.trendValue
                  )}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{topic.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Remaining Topics - Compact Layout */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          More Trending
        </h3>

        {filteredTopics.slice(3).map((topic) => (
          <Card
            key={topic.id}
            className="hover:shadow-md transition-shadow cursor-pointer group"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-bold">
                    #{topic.rank}
                  </Badge>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold group-hover:text-primary transition-colors flex items-center">
                        <Hash className="w-4 h-4 text-primary" />
                        {topic.hashtag}
                      </span>
                      <Badge
                        variant="outline"
                        className={getCategoryColor(topic.category)}
                      >
                        {topic.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`flex items-center gap-1 font-bold ${getTrendColor(
                      topic.trendValue
                    )}`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>{topic.trend}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {topic.posts} posts
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Stats */}
      <Card className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-primary">384K</div>
              </div>
              <div className="text-sm text-muted-foreground">Posts Today</div>
              <div className="text-xs text-green-600 font-medium">
                +12% from yesterday
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-primary">52</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Trending Topics
              </div>
              <div className="text-xs text-green-600 font-medium">
                +8 new topics
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-primary">1.2M</div>
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="text-xs text-green-600 font-medium">
                Peak activity
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-primary">+23%</div>
              </div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
              <div className="text-xs text-green-600 font-medium">
                All-time high
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TrendingTopics;
