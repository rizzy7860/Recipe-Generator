"use client";
// SECTION: Import Statements
import { IRecipeIngredients } from "@/models/interfacesTypes";
import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import RecipeResults from "../RecipeResults/RecipeResults";

// SECTION: Interfaces and Types
interface IRecipeSelectorProps {
  ingredients: IRecipeIngredients[];
}

export default function RecipeSelector({ ingredients }: IRecipeSelectorProps) {
  // 💬: Establish state to stores the ingredient selected by the user once the search is made and the value selected; the state is lifted up from SearchInput for consumption by MealResults
  const [selectedIngredient, setSelectedIngredient] =
    useState<IRecipeIngredients | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="flex flex-col gap-4">
        <SearchInput
          ingredients={ingredients}
          setSelectedIngredient={setSelectedIngredient}
        />
        {/* Divider */}
        <div className="border-b border-gray-200 w-full" />
      </div>
      {/* Search Results */}
      <div className="">
        {/* Recipe Results */}
        {selectedIngredient && (
          <RecipeResults selectedIngredient={selectedIngredient} />
        )}
      </div>
    </div>
  );
}
