"use client";
// SECTION: Import Statements
import { IRecipeIngredients } from "@/models/interfacesTypes";
import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";

// SECTION: Interfaces and Types
interface IRecipeSelectorProps {
  ingredients: IRecipeIngredients[];
}

export default function RecipeSelector({ ingredients }: IRecipeSelectorProps) {
  // 💬: Establish state to stores the ingredient selected by the user once the search is made and the value selected
  const [selectedIngredient, setSelectedIngredient] =
    useState<IRecipeIngredients | null>(null);

  console.log(selectedIngredient);

  return (
    <div className="flex flex-col items-center">
      {/* Search Input */}
      <SearchInput
        ingredients={ingredients}
        setSelectedIngredient={setSelectedIngredient}
      />

      {/* Meal Results */}
      {/* {selectedIngredient && (
        <MealResults selectedIngredient={selectedIngredient} />
      )} */}
    </div>
  );
}
