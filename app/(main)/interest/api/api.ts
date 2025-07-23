 interface Category {
  idCategory: number;
  name: string;
  idUserCreate: number;
  idUserUpdate: number;
  dateCreate: string | null;
  dateUpdate: string | null;
}


const BASE_URL = "http://localhost:8080/api/categories";

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Error fetching categories");
  return res.json();
};

export const getCategory = async (id: number): Promise<Category> => {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Category not found");
  return res.json();
};

export const createCategory = async (category: Omit<Category, "idCategory">) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Error creating category");
  return res.json();
};

export const updateCategory = async (id: number, category: Partial<Category>) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Error updating category");
  return res.json();
};

export const deleteCategory = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting category");
};
