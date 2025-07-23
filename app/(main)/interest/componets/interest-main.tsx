"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Plus, Unlock, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getCategories } from "../api/api"; // Ajusta la ruta si es necesario

interface Category {
  idCategory: number;
  name: string;
  idUserCreate: number;
  idUserUpdate: number;
  dateCreate: string | null;
  dateUpdate: string | null;
}

function InterestMain() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<
    Array<{ id: number; name: string; locked: boolean }>
  >([]);
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const addCustomInterest = () => {
    if (newInterest.trim() !== "") {
      const newId = Date.now();
      setSelectedInterests([
        ...selectedInterests,
        { id: newId, name: newInterest, locked: false },
      ]);
      setNewInterest("");
    }
  };

  const addInterest = (category: Category) => {
    if (
      !selectedInterests.some((interest) => interest.name === category.name)
    ) {
      setSelectedInterests([
        ...selectedInterests,
        { id: category.idCategory, name: category.name, locked: false },
      ]);
    }
  };

  const removeInterest = (id: number) => {
    setSelectedInterests(
      selectedInterests.filter((interest) => interest.id !== id)
    );
  };

  const toggleLock = (id: number) => {
    setSelectedInterests(
      selectedInterests.map((interest) =>
        interest.id === id
          ? { ...interest, locked: !interest.locked }
          : interest
      )
    );
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">Select your interests</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your selected interests</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedInterests.length === 0 ? (
            <p className="text-primary">
              You haven&apos;t selected any interests yet
            </p>
          ) : (
            selectedInterests.map((interest) => (
              <Badge
                key={interest.id}
                className="px-3 py-2 bg-accent hover:bg-accent/80 text-accent-foreground flex items-center gap-2"
              >
                {interest.name}
                <button
                  onClick={() => toggleLock(interest.id)}
                  className="ml-1 hover:text-primary cursor-pointer"
                >
                  {interest.locked ? <Lock size={14} /> : <Unlock size={14} />}
                </button>
                {!interest.locked && (
                  <button
                    onClick={() => removeInterest(interest.id)}
                    className="ml-1 hover:text-destructive cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </Badge>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addCustomInterest();
              }
            }}
            placeholder="Add a custom interest"
            className="bg-card border-border text-foreground z-10 relative "
          />
          <Button
            onClick={addCustomInterest}
            variant="outline"
            className="border-border cursor-pointer hover:bg-muted bg-transparent text-foreground"
          >
            <Plus size={16} className="mr-1" /> Add
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Popular categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories
            .filter(
              (category) =>
                !selectedInterests.some(
                  (interest) => interest.name === category.name
                )
            )
            .map((category) => (
              <div
                key={category.idCategory}
                className="p-4 bg-card rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => addInterest(category)}
              >
                <h3 className="font-medium text-foreground">{category.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Click to add this category to your interests
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default InterestMain;
