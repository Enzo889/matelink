"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Plus, Unlock, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Interest {
  id: number;
  name: string;
  locked?: boolean;
}

interface UserInterestData {
  interest_id: number;
  interests: {
    id: number;
    name: string;
  };
}

function InterestMain() {
  const supabase = createClient();
  const [popularInterests, setPopularInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  // Obtener usuario actual
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("Auth user:", user);

      if (user) {
        // Obtener el user_id numérico de la tabla users
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", user.id)
          .single();

        console.log("User data from users table:", { userData, userError });
        setUserId(userData?.id ?? null);
      }
    };
    getUser();
  }, [supabase]);

  // Obtener todos los intereses disponibles
  useEffect(() => {
    const fetchInterests = async () => {
      const { data } = await supabase.from("interests").select("id, name");

      setPopularInterests(data ?? []);
    };
    fetchInterests();
  }, [supabase]);

  // Obtener intereses del usuario
  useEffect(() => {
    if (!userId) return;

    const fetchUserInterests = async () => {
      const { data, error } = await supabase
        .from("user_interests")
        .select(
          `
          interest_id,
          interests (id, name)
        `
        )
        .eq("user_id", userId);

      console.log("Fetching user interests for userId:", userId);
      console.log("User interests data:", data);
      console.log("User interests error:", error);

      if (data) {
        const userInterests = data.map((item: UserInterestData) => ({
          id: item.interests.id,
          name: item.interests.name,
          locked: false,
        }));
        setSelectedInterests(userInterests);
      }
    };

    fetchUserInterests();
  }, [userId, supabase]);

  // Agregar interés personalizado
  const addCustomInterest = async () => {
    if (newInterest.trim() === "" || !userId) return;

    // Evitar duplicados
    if (
      selectedInterests.some(
        (i) => i.name.toLowerCase() === newInterest.trim().toLowerCase()
      )
    )
      return;

    try {
      // Primero crear el interés si no existe
      const { data: existingInterest } = await supabase
        .from("interests")
        .select("id, name")
        .ilike("name", newInterest.trim())
        .single();

      let interestId;

      if (existingInterest) {
        interestId = existingInterest.id;
      } else {
        // Crear nuevo interés
        const { data: newInterestData, error: interestError } = await supabase
          .from("interests")
          .insert([{ name: newInterest.trim() }])
          .select()
          .single();

        if (interestError || !newInterestData) return;
        interestId = newInterestData.id;
      }

      // Agregar relación usuario-interés
      const { error: relationError } = await supabase
        .from("user_interests")
        .insert([{ user_id: userId, interest_id: interestId }]);

      if (!relationError) {
        setSelectedInterests([
          ...selectedInterests,
          {
            id: interestId,
            name: newInterest.trim(),
            locked: false,
          },
        ]);
        setNewInterest("");
      }
    } catch (error) {
      console.error("Error adding custom interest:", error);
    }
  };

  // Agregar interés popular
  const addInterest = async (interest: Interest) => {
    if (!userId) return;
    if (selectedInterests.some((i) => i.id === interest.id)) return;

    try {
      const { error } = await supabase
        .from("user_interests")
        .insert([{ user_id: userId, interest_id: interest.id }]);

      if (!error) {
        setSelectedInterests([
          ...selectedInterests,
          { ...interest, locked: false },
        ]);
      }
    } catch (error) {
      console.error("Error adding interest:", error);
    }
  };

  // Eliminar interés
  const removeInterest = async (interestId: number) => {
    console.log("Attempting to remove interest:", { interestId, userId });

    if (!userId) {
      console.log("No userId found, cannot remove interest");
      return;
    }

    try {
      // Primero verificar si la relación existe
      const { data: existingRelation, error: checkError } = await supabase
        .from("user_interests")
        .select("*")
        .eq("user_id", userId)
        .eq("interest_id", interestId);

      console.log("Existing relation check:", { existingRelation, checkError });

      const { data, error } = await supabase
        .from("user_interests")
        .delete()
        .eq("user_id", userId)
        .eq("interest_id", interestId)
        .select(); // Agregar select para ver qué se eliminó

      console.log("Delete result:", { data, error });

      if (!error) {
        setSelectedInterests(
          selectedInterests.filter((i) => i.id !== interestId)
        );
        console.log("Interest removed from state");
      } else {
        console.error("Delete error:", error);
      }
    } catch (error) {
      console.error("Error removing interest:", error);
    }
  };

  // Bloquear/desbloquear (solo local)
  const toggleLock = (id: number) => {
    setSelectedInterests(
      selectedInterests.map((i) =>
        i.id === id ? { ...i, locked: !i.locked } : i
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
          {popularInterests
            .filter(
              (interest) =>
                !selectedInterests.some((sel) => sel.name === interest.name)
            )
            .map((interest) => (
              <div
                key={interest.id}
                className="p-4 bg-card rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => addInterest(interest)}
              >
                <h3 className="font-medium text-foreground">{interest.name}</h3>
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
