import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function ItemsMarketplace() {
    const offers = [
        {
          id: 1,
          href: "/marketplace/1",
          image: "/1.jpg",
          alt: "brown hoodie",
          name: "Brown Hoodie",
          stock: "Only 2 left in stock",
          oldPrice: "$30.99",
          price: "$19.99",
          discount: "35% off",
          installments: "Or 9 installments of $2.22",
          shipping: "Free Shipping",
        },
        {
          id: 2,
          href: "/marketplace/2",
          image: "/3.webp",
          alt: " black sweatshirt without hood",
          name: "Black Sweatshirt",
          stock: "Only 5 left in stock",
          oldPrice: "$45.00",
          price: "$29.99",
          discount: "33% off",
          installments: "Or 6 installments of $5.00",
          shipping: "Free Shipping",
        },
      ];
    
      return (
        <div className="flex flex-col items-start   gap-4  p-4 rounded-l w-full">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.href}
              className="hover:bg-foreground/5 transition-colors w-full "
            >
              <div className="flex items-center gap-4 border p-4   ">
                <Image src={offer.image} width={70} height={100} alt={offer.alt} />
                <div>
                  <p className="text-sm font-medium">{offer.name}</p>
                  <p className="text-xs text-foreground/50">{offer.stock}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm line-through text-foreground/50">
                      {offer.oldPrice}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      {offer.price}
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
          ))}
        </div>
  )
}

export default ItemsMarketplace