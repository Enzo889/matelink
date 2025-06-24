"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { categories } from "./data/category-data";
import { ArrowUpFromLineIcon, Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Types and interfaces
interface OfferItem {
  id: string;
  title: string;
  price: number;
  discount?: number;
  category: string;
  condition: string;
  description: string;
  location: string;
  images?: string[];
  categoryId?: number;
}

interface EditItemProps {
  item?: OfferItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
});

function EditItem({ item, onSuccess, onCancel }: EditItemProps) {
  const [images, setImages] = useState<string[]>(item?.images || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item?.title || "",
      price: item?.price?.toString() || "",
      discount: item?.discount?.toString() || "0",
      category: item?.category || "",
      condition: item?.condition || "",
      description: item?.description || "",
      location: item?.location || "",
    },
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      form.reset({
        title: item.title,
        price: item.price.toString(),
        discount: item.discount?.toString() || "0",
        category: item.category,
        condition: item.condition,
        description: item.description,
        location: item.location,
      });
      setImages(item.images || []);
    }
  }, [item, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  // API Functions
  const updateOffer = async (offerId: string, offerData: any) => {
    const response = await fetch(
      `http://localhost:8080/offers/api/v1/${offerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update offer");
    }

    return response.json();
  };

  const createOffer = async (offerData: any) => {
    const response = await fetch("http://localhost:8080/offers/api/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });

    if (!response.ok) {
      throw new Error("Failed to create offer");
    }

    return response.json();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const offerData = {
        ...values,
        price: parseFloat(values.price),
        discount: values.discount ? parseFloat(values.discount) : 0,
        images: images,
        categoryId:
          categories.find((cat) => cat.name === values.category)?.id || 1,
      };

      if (item?.id) {
        await updateOffer(item.id, offerData);
        toast.success("Offer updated successfully!");
      } else {
        await createOffer(offerData);
        toast.success("Offer created successfully!");
      }

      setIsOpen(false);
      form.reset();
      setImages([]);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting offer:", error);
      toast.error(
        item?.id ? "Failed to update offer" : "Failed to create offer"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.reset();
    setImages(item?.images || []);
    onCancel?.();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {!item?.id ? (
          <Button
            asChild
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <DialogTrigger>
              <ArrowUpFromLineIcon />
              Sell
            </DialogTrigger>
          </Button>
        ) : (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className=" w-full justify-start h-8  cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <DialogTrigger>
              {" "}
              <Edit className="h-4 w-4 mr-2" /> Edit{" "}
            </DialogTrigger>
          </Button>
        )}
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {item?.id ? "Edit Offer" : "Create New Offer"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer border-2 border-dashed p-4 rounded-lg"
                >
                  Upload Images
                </label>
                <div className="flex gap-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <Image
                        src={img}
                        alt={`Preview ${index}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span className="flex gap-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          max="100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories
                            .filter(
                              (category) =>
                                category.id !== 1 && category.id !== 2
                            )
                            .map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {item?.id ? "Updating..." : "Creating..."}
                    </>
                  ) : item?.id ? (
                    "Update Offer"
                  ) : (
                    "Create Offer"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditItem;
