"use client"
import { createClient } from "@/utils/supabase/client";
import { CategoryType } from "@/types/tables.type";
import { useEffect, useState } from "react";
const supabase = createClient();

export function useCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('id');

      if (error) {
        setError(error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
