import React from "react";
import Image from "next/image";
import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, HeartIcon, ShareIcon } from "lucide-react";
import ShoppingCart from "../__component/cart";
import { offersApi } from "../__component/api";

// Example data - in a real application, this would come from a database
const getProductData = async (id: string) => {
  return await offersApi.getById(id);
};

const calculatePrice = (oldPrice: number, discount: number | null): number => {
  if (!discount) return oldPrice;
  return oldPrice * (1 - discount / 100);
};

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-4">
          The product you are looking for does not exist.
        </p>
        <BackButton />
      </div>
    );
  }

  const finalPrice = calculatePrice(product.price, product.discount);

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center gap-4 p-4 border-b-2">
        <span className="flex">
          <BackButton />
          <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        </span>
        <ShoppingCart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Product image */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <Image
              src={product.image}
              alt={product.name.toLowerCase()}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Product information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {product.stock}
            </p>

            {/* Prices */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-green-600">
                ${finalPrice}
              </span>
              {product.discount && (
                <>
                  <span className="text-lg line-through text-muted-foreground">
                    ${product.price}
                  </span>
                  <span className="text-sm uppercase font-medium text-green-500 bg-green-50 px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              {product.installments}
            </p>
            <p className="text-sm text-green-600 font-medium mb-6">
              {product.shipping}
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button className="w-full cursor-pointer" size="lg">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 cursor-pointer">
                <HeartIcon className="w-4 h-4 mr-2" />
                Favorites
              </Button>
              <Button variant="outline" className="flex-1 cursor-pointer">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Additional information */}
          <div className="space-y-4 pt-6 border-t">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground  text-pretty">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Category:</span>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <span className="font-medium">Condition:</span>
                <p className="text-muted-foreground">{product.condition}</p>
              </div>
              <div>
                <span className="font-medium">Seller:</span>
                <p className="text-muted-foreground">{product.seller}</p>
              </div>
              <div>
                <span className="font-medium">Location:</span>
                <p className="text-muted-foreground">{product.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
