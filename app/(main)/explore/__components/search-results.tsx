"use client";

import { useState } from "react";
import { ArrowLeft, User, Hash, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

function SearchResults({ query, onBack }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Mock search results
  const users = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Frontend Developer passionate about React and TypeScript",
      followers: "2.3K",
      verified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "UX Designer creating beautiful and functional interfaces",
      followers: "1.8K",
      verified: false,
    },
  ];

  const posts = [
    {
      id: 1,
      author: "Tech Insider",
      username: "techinsider",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      content: `Just discovered an amazing ${query} tutorial that covers everything from basics to advanced concepts. Highly recommend checking it out!`,
      time: "2 hours ago",
      likes: 45,
      comments: 12,
      shares: 8,
    },
    {
      id: 2,
      author: "Code Master",
      username: "codemaster",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      content: `Working on a new ${query} project and loving the developer experience. The community support is incredible!`,
      time: "4 hours ago",
      likes: 67,
      comments: 23,
      shares: 15,
    },
  ];

  const topics = [
    {
      id: 1,
      hashtag: `#${query}`,
      posts: "12.5K",
      trend: "+15%",
      description: `Latest discussions and updates about ${query}`,
    },
    {
      id: 2,
      hashtag: `#${query}Tips`,
      posts: "8.2K",
      trend: "+8%",
      description: `Tips and tricks for ${query} development`,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Search Results</h2>
          <p className="text-sm text-muted-foreground">Results for "{query}"</p>
        </div>
      </div>

      {/* Search Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Topics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {/* Top Users */}
          <div>
            <h3 className="text-lg font-semibold mb-4">People</h3>
            <div className="space-y-3">
              {users.slice(0, 2).map((user) => (
                <Card
                  key={user.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          {user.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {user.bio}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {user.followers}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          followers
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Top Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Posts</h3>
            <div className="space-y-3">
              {posts.slice(0, 2).map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          <span className="text-sm text-muted-foreground">
                            @{post.username}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ·
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {post.time}
                          </span>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                          <span>{post.shares} shares</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-6">
          {users.map((user) => (
            <Card
              key={user.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{user.name}</h4>
                      {user.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      @{user.username}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.bio}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{user.followers}</div>
                    <div className="text-xs text-muted-foreground">
                      followers
                    </div>
                    <Button size="sm" className="mt-2 cursor-pointer">
                      Follow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="posts" className="space-y-4 mt-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{post.author}</h4>
                      <span className="text-sm text-muted-foreground">
                        @{post.username}
                      </span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">
                        {post.time}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="topics" className="space-y-4 mt-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">
                      {topic.hashtag}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{topic.posts} posts</span>
                      <span className="text-green-600">
                        {topic.trend} trending
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SearchResults;
