"use client";

import {
  ShoppingBag,
  Star,
  MapPin,
  Heart,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function ProductOffers() {
  const products = [
    {
      id: 1,
      name: 'MacBook Pro M3 14"',
      price: 1899,
      oldPrice: 2199,
      discount: 14,
      image: "https://picsum.photos/300/200?random=10",
      condition: "New",
      location: "San Francisco, CA",
      shipping: "Free shipping",
      rating: 4.8,
      reviews: 124,
      seller: "TechStore Pro",
      category: "Electronics",
      trending: true,
      stock: "5 left",
      installments: "12x $158.25",
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 1099,
      oldPrice: 1199,
      discount: 8,
      image: "https://picsum.photos/300/200?random=11",
      condition: "New",
      location: "New York, NY",
      shipping: "Free shipping",
      rating: 4.9,
      reviews: 89,
      seller: "Mobile World",
      category: "Electronics",
      trending: true,
      stock: "3 left",
      installments: "24x $45.79",
    },
    {
      id: 3,
      name: "Gaming Chair RGB",
      price: 299,
      oldPrice: 399,
      discount: 25,
      image: "https://picsum.photos/300/200?random=12",
      condition: "New",
      location: "Los Angeles, CA",
      shipping: "Free shipping",
      rating: 4.6,
      reviews: 67,
      seller: "Gaming Gear",
      category: "Furniture",
      trending: false,
      stock: "12 available",
      installments: "6x $49.83",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      price: 349,
      oldPrice: 399,
      discount: 13,
      image: "https://picsum.photos/300/200?random=13",
      condition: "New",
      location: "Chicago, IL",
      shipping: "Free shipping",
      rating: 4.7,
      reviews: 156,
      seller: "Audio Pro",
      category: "Electronics",
      trending: true,
      stock: "8 available",
      installments: "12x $29.08",
    },
    {
      id: 5,
      name: "Nike Air Jordan 1",
      price: 179,
      oldPrice: 220,
      discount: 19,
      image: "https://picsum.photos/300/200?random=14",
      condition: "New",
      location: "Miami, FL",
      shipping: "Free shipping",
      rating: 4.5,
      reviews: 203,
      seller: "Sneaker Hub",
      category: "Fashion",
      trending: false,
      stock: "15 available",
      installments: "4x $44.75",
    },
    {
      id: 6,
      name: "Samsung 4K Monitor",
      price: 449,
      oldPrice: 549,
      discount: 18,
      image: "https://picsum.photos/300/200?random=15",
      condition: "New",
      location: "Seattle, WA",
      shipping: "Free shipping",
      rating: 4.4,
      reviews: 91,
      seller: "Display World",
      category: "Electronics",
      trending: true,
      stock: "6 available",
      installments: "18x $24.94",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Electronics:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Furniture:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Fashion: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Hot Deals</h2>
        </div>
        <Button variant="outline" size="sm">
          View Marketplace
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.trending && (
                  <Badge
                    variant="destructive"
                    className="text-xs animate-pulse"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    -{product.discount}%
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge
                    variant="outline"
                    className={getCategoryColor(product.category)}
                  >
                    {product.category}
                  </Badge>
                  <CardTitle className="text-base mt-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Price Section */}
              <div className="flex items-center gap-2">
                {product.discount > 0 && (
                  <span className="text-sm line-through text-muted-foreground">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Location and Stock */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
                <span className="text-green-600 font-medium">
                  {product.stock}
                </span>
              </div>

              {/* Seller and Shipping */}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Sold by{" "}
                  <span className="font-medium text-foreground">
                    {product.seller}
                  </span>
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {product.shipping}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.installments}
                </p>
              </div>

              {/* Action Button */}
              <Button className="w-full cursor-pointer group-hover:bg-primary/90 transition-colors">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Stats */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">
                Products Available
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Hot Deals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">
                Positive Reviews
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Fast Delivery</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductOffers;
