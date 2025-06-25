"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Heart, ShoppingCart, MoreHorizontal, Trash2 } from "lucide-react";
import { Category } from "./data/category-data";
import { OffersInterface } from "./data/product-data";
import EditItem from "./edit";
import { offersApi } from "./api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Filters {
  priceRange: [number, number];
  condition: string;
  location: string;
}

interface ItemsMarketplaceProps {
  selectedCategory: Category | null;
  filters: Filters;
  searchTerm: string;
}

function ItemsMarketplace({
  selectedCategory,
  filters,
  searchTerm,
}: ItemsMarketplaceProps) {
  const [offers, setOffers] = useState<OffersInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Llama a la API al montar el componente
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await offersApi.getAll();
        setOffers(response); // Ajusta según la estructura de tu API
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const deleteOffer = async (id: number) => {
    try {
      await offersApi.delete(id);
      setOffers((prev) => prev.filter((offer) => offer.id !== id)); // Elimina del estado local
      toast.success("Product deleted successfully!");
      router.refresh(); // Refresh the page to reflect changes
      // Optionally, you can refresh the offers list or update state here
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
    }
    return { deleteOffer };
  };

  // Calculate final price based on oldPrice and discount
  const calculatePrice = (
    oldPrice: number,
    discount: number | null
  ): number => {
    if (!discount) return oldPrice;
    return oldPrice * (1 - discount / 100);
  };

  // Filter offers based on selected category, filters, and search term
  const filteredOffers = offers.filter((offer) => {
    const finalPrice = calculatePrice(offer.price, offer.discount);

    // Category filter
    const categoryMatch =
      !selectedCategory ||
      selectedCategory.id === 1 ||
      offer.categoryId === selectedCategory.id ||
      (selectedCategory.id === 2 && offer.discount);

    // Price filter using calculated final price
    const priceMatch =
      finalPrice >= filters.priceRange[0] &&
      finalPrice <= filters.priceRange[1];

    // Condition filter
    const conditionMatch =
      offer.condition === filters.condition || filters.condition === "any";

    // Location filter (case insensitive partial mWatch)
    const locationMatch =
      filters.location === "" ||
      offer.location.toLowerCase().includes(filters.location.toLowerCase());

    // Search term filter (search in name and alt)
    const searchMatch =
      searchTerm === "" ||
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.alt.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      categoryMatch &&
      priceMatch &&
      conditionMatch &&
      locationMatch &&
      searchMatch
    );
  });

  if (loading) {
    return <Loading className="flex-1" />;
  }
  return (
    <div className="flex flex-col items-start gap-4 p-4 rounded-l w-full">
      {filteredOffers.length === 0 ? (
        <div className="w-full text-center py-8">
          <p className="text-foreground/50">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        filteredOffers.map((offer) => {
          const finalPrice = calculatePrice(offer.price, offer.discount);

          return (
            <div key={offer.id} className="w-full relative">
              {/* Options Popover - Moved outside Link */}
              <Popover>
                <PopoverTrigger asChild className="z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 cursor-pointer absolute top-2 right-2"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start h-8"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start h-8"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    {offer.isOwner && (
                      <>
                        <EditItem
                          item={{
                            id: offer.id.toString(),
                            title: offer.name,
                            price: offer.price,
                            category: offer.category,
                            condition: offer.condition,
                            description: offer.description,
                            location: offer.location,
                            images: [offer.image],
                            discount: offer.discount ?? undefined,
                            categoryId: offer.categoryId,
                          }}
                          onSuccess={() => {
                            // Refresh the items list or show success message
                            toast.success("Product updated successfully!");
                          }}
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="justify-start h-8 text-destructive hover:text-destructive hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this product?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the product from the
                                marketplace.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="cursor-pointer bg-destructive text-white hover:bg-destructive/80"
                                onClick={() => deleteOffer(offer.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <Link
                href={`/marketplace/${offer.id}`}
                className="hover:bg-foreground/5 transition-colors block"
              >
                <div className="flex items-center gap-4 border p-4">
                  <Image
                    src={offer.image}
                    width={70}
                    height={100}
                    alt={offer.name.toLowerCase()}
                  />
                  <div>
                    <p className="text-sm font-medium">{offer.name}</p>
                    <p className="text-xs text-foreground/50">{offer.stock}</p>
                    <p className="text-xs text-foreground/40 capitalize">
                      {offer.condition} • {offer.location}
                    </p>
                    <div className="flex items-center gap-2">
                      {offer.discount && (
                        <p className="text-sm line-through text-foreground/50">
                          ${offer.price.toFixed(2)}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-green-600">
                        ${finalPrice.toFixed(2)}
                      </p>
                      <span className="text-xs uppercase font-light text-green-500">
                        {offer.discount ? `${offer.discount}% off` : ""}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70">
                      {offer.installments}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      {offer.shipping}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ItemsMarketplace;
