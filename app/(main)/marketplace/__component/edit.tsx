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
import { offersApi } from "./api";
import { OffersInterface } from "./data/product-data";

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
  // Cambio: Ahora guardamos los nombres de archivo en lugar de URLs blob
  const [imageNames, setImageNames] = useState<string[]>(item?.images || []);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
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
      setImageNames(item.images || []);
      // Para imágenes existentes, asumimos que son rutas del servidor
      setImagePreviewUrls(item.images || []);
    }
  }, [item, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFileNames: string[] = [];
      const newPreviewUrls: string[] = [];

      Array.from(files).forEach((file) => {
        // Guardamos solo el nombre del archivo con "/"
        const fileName = `/${file.name}`;
        newFileNames.push(fileName);

        // Creamos URL para preview
        const previewUrl = URL.createObjectURL(file);
        newPreviewUrls.push(previewUrl);
      });

      setImageNames([...imageNames, ...newFileNames]);
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
    }
  };

  // Función para limpiar URLs de preview cuando se cierre el modal
  const cleanupPreviewUrls = () => {
    imagePreviewUrls.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
  };

  // API Functions
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const offerData: Partial<OffersInterface> = {
        name: values.title,
        price: parseFloat(values.price),
        discount: values.discount ? parseFloat(values.discount) : 0,
        category: values.category,
        condition: values.condition as "new" | "like-new" | "used",
        description: values.description,
        location: values.location,
        // Ahora guardamos el nombre del archivo en lugar del blob URL
        image: imageNames.length > 0 ? imageNames[0] : "",
        categoryId:
          categories.find((cat) => cat.name === values.category)?.id || 1,
      };

      if (item?.id) {
        await offersApi.update(item.id, offerData);
        toast.success("Offer updated successfully!");
      } else {
        await offersApi.create(offerData as OffersInterface);
        toast.success("Offer created successfully!");
      }

      setIsOpen(false);
      form.reset();
      setImageNames([]);
      cleanupPreviewUrls();
      setImagePreviewUrls([]);
      onSuccess?.();
      window.location.reload();
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
    setImageNames(item?.images || []);
    cleanupPreviewUrls();
    setImagePreviewUrls(item?.images || []);
    onCancel?.();
  };

  // Función para remover imagen
  const removeImage = (index: number) => {
    const newImageNames = imageNames.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);

    // Limpiar URL de preview si es un blob
    if (imagePreviewUrls[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviewUrls[index]);
    }

    setImageNames(newImageNames);
    setImagePreviewUrls(newPreviewUrls);
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
                  onChange={handleImageUpload} // Cambia por la función que prefieras
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer border-2 border-dashed p-4 rounded-lg"
                >
                  Upload Images
                </label>
                <div className="flex gap-2 flex-wrap">
                  {imagePreviewUrls.map((previewUrl, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <Image
                        src={
                          previewUrl.startsWith("/") ? previewUrl : previewUrl
                        }
                        alt={`Preview ${index}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                      {/* Mostrar el nombre del archivo guardado */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                        {imageNames[index]}
                      </div>
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
                        <Input
                          type="number"
                          placeholder="00"
                          min={1}
                          max={1000}
                          {...field}
                        />
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
                  className="flex-1 cursor-pointer"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 cursor-pointer"
                  disabled={isLoading}
                >
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
