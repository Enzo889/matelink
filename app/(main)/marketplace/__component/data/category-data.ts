export interface Category {
    id: number;
    name: string;
  }

export const categories: Category[] = [
    { id: 1, name: "All Products" },
    { id: 2, name: "Fashion & Apparel" },
    { id: 3, name: "Electronics & Gadgets" },
    { id: 4, name: "Home & Living" },
    { id: 5, name: "Health & Beauty" },
    { id: 6, name: "Sports & Fitness" },
    { id: 7, name: "Books & Media" },
    { id: 8, name: "Art & Crafts" },
    { id: 9, name: "Food & Beverages" },
    { id: 10, name: "Toys & Games" },
    { id: 11, name: "Automotive & Tools" },
    { id: 12, name: "Pet Supplies" },
    { id: 13, name: "Travel & Luggage" },
    { id: 14, name: "Musical Instruments" },
    { id: 15, name: "Office & Stationery" },
  ] as const;