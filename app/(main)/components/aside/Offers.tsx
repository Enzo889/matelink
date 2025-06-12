import Image from "next/image";
import Link from "next/link";
import React from "react";

function OffersComponent() {
  return (
    <div className="flex flex-col items-start text-start text-pretty gap-4 p-6 bg-background border rounded-lg">
      <p className="font-semibold text-2xl">Offers of the day</p>
      <Link
        href={"/product/1"}
        className=" hover:bg-foreground/5 transition-colors"
      >
        <div className="flex items-ce</a>nter gap-4 border p-4 rounded-lg">
          <Image src={"/1.jpg"} width={70} height={100} alt=" brown hoddie " />
          <div>
            <p className="text-sm font-medium">Brown Hoodie</p>
            <p className="text-xs text-foreground/50">Only 2 left in stock</p>
            <div className="flex items-center gap-2">
              <p className="text-sm line-through text-foreground/50">$30.99</p>
              <p className="text-sm font-semibold text-green-600">$19.99</p>
              <span className="text-xs uppercase font-light text-green-500">
                35% off
              </span>
            </div>
            <p className="text-xs text-foreground/70">
              Or 9 installments of $2.22
            </p>
            <p className="text-xs text-green-600 font-medium">Free Shipping</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default OffersComponent;
