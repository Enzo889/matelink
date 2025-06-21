import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ItemsMarketplaceProps {
  selectedCategory: { id: number; name: string };
  filters: {
    priceRange: number[];
    location: string;
    condition: string;
  };
}

function ItemsMarketplace({ selectedCategory, filters }: ItemsMarketplaceProps) {
    const allOffers = [
        {
          id: 1,
          href: "/marketplace/1",
          image: "/1.jpg",
          alt: "brown hoodie",
          name: "Brown Hoodie",
          stock: "Only 2 left in stock",
          oldPrice: 30.99,
          price: 19.99,
          discount: "35% off",
          installments: "Or 9 installments of $2.22",
          shipping: "Free Shipping",
          categoryId: 2, // Fashion & Apparel
          condition: "new",
          location: "New York"
        },
        {
          id: 2,
          href: "/marketplace/2",
          image: "/3.webp",
          alt: " black sweatshirt without hood",
          name: "Black Sweatshirt",
          stock: "Only 5 left in stock",
          oldPrice: 45.00,
          price: 29.99,
          discount: "33% off",
          installments: "Or 6 installments of $5.00",
          shipping: "Free Shipping",
          categoryId: 2, // Fashion & Apparel
          condition: "like-new",
          location: "California"
        },
        {
          id: 3,
          href: "/marketplace/3",
          image: "/2.webp",
          alt: "wireless headphones",
          name: "Wireless Headphones",
          stock: "In stock",
          oldPrice: 199.99,
          price: 149.99,
          discount: "25% off",
          installments: "Or 12 installments of $12.50",
          shipping: "Free Shipping",
          categoryId: 3, // Electronics & Gadgets
          condition: "new",
          location: "Texas"
        },
        {
          id: 4,
          href: "/marketplace/4",
          image: "/4.webp",
          alt: "coffee mug",
          name: "Ceramic Coffee Mug",
          stock: "Only 10 left in stock",
          oldPrice: 15.99,
          price: 9.99,
          discount: "37% off",
          installments: "Or 3 installments of $3.33",
          shipping: "Free Shipping",
          categoryId: 4, // Home & Living
          condition: "used",
          location: "Florida"
        },
        {
          id: 5,
          href: "/marketplace/5",
          image: "/1.jpg",
          alt: "gaming mouse",
          name: "Gaming Mouse RGB",
          stock: "Limited stock",
          oldPrice: 89.99,
          price: 59.99,
          discount: "33% off",
          installments: "Or 6 installments of $10.00",
          shipping: "Free Shipping",
          categoryId: 3, // Electronics & Gadgets
          condition: "new",
          location: "New York"
        },
        {
          id: 6,
          href: "/marketplace/6",
          image: "/3.webp",
          alt: "yoga mat",
          name: "Premium Yoga Mat",
          stock: "In stock",
          oldPrice: 49.99,
          price: 34.99,
          discount: "30% off",
          installments: "Or 4 installments of $8.75",
          shipping: "Free Shipping",
          categoryId: 6, // Sports & Fitness
          condition: "like-new",
          location: "California"
        }
      ];

    // Filter offers based on selected category and filters
    const filteredOffers = allOffers.filter(offer => {
      // Category filter
      const categoryMatch = selectedCategory.id === 1 || offer.categoryId === selectedCategory.id;
      
      // Price filter
      const priceMatch = offer.price >= filters.priceRange[0] && offer.price <= filters.priceRange[1];
      
      // Condition filter
      const conditionMatch = offer.condition === filters.condition;
      
      // Location filter (case insensitive partial match)
      const locationMatch = filters.location === "" || 
        offer.location.toLowerCase().includes(filters.location.toLowerCase());
      
      return categoryMatch && priceMatch && conditionMatch && locationMatch;
    });
    
      return (
        <div className="flex flex-col items-start gap-4 p-4 rounded-l w-full">
          {filteredOffers.length === 0 ? (
            <div className="w-full text-center py-8">
              <p className="text-foreground/50">No products found matching your criteria.</p>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <Link
                key={offer.id}
                href={offer.href}
                className="hover:bg-foreground/5 transition-colors w-full"
              >
                <div className="flex items-center gap-4 border p-4">
                  <Image src={offer.image} width={70} height={100} alt={offer.alt} />
                  <div>
                    <p className="text-sm font-medium">{offer.name}</p>
                    <p className="text-xs text-foreground/50">{offer.stock}</p>
                    <p className="text-xs text-foreground/40 capitalize">{offer.condition} • {offer.location}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm line-through text-foreground/50">
                        ${offer.oldPrice.toFixed(2)}
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        ${offer.price.toFixed(2)}
                      </p>
                      <span className="text-xs uppercase font-light text-green-500">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70">{offer.installments}</p>
                    <p className="text-xs text-green-600 font-medium">
                      {offer.shipping}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
  )
}

export default ItemsMarketplace