// SECTION: SearchInput.tsx
"use client"; // Marked as a client component
import { searchIcon } from "@/icons/icons";
import { IRecipeIngredients } from "@/models/interfacesTypes";
import { ChangeEvent, useState } from "react";

// SECTION: Interface & Types
interface SearchInputProps {
  ingredients: IRecipeIngredients[];
  // 💬: Prop to update the selected ingredient in parent
  setSelectedIngredient: (ingredient: IRecipeIngredients) => void;
}

export default function SearchInput({
  ingredients,
  setSelectedIngredient,
}: SearchInputProps) {
  // 💬: Establish state to store user input
  const [searchText, setSearchText] = useState<string>("");
  // 💬: Establish state to control the visibility of the suggestions
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // 💬: Updates the searchText variable whenever the user types
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setShowSuggestions(true); // Show suggestions when typing
  };

  // 💬: Handler function that handles the selection of the ingredient from the list
  const handleSelectIngredient = (ingredient: IRecipeIngredients) => {
    // 💬: Update input field with selected ingredient
    setSearchText(ingredient.strIngredient);
    // 💬: Set selected ingredient in state
    setSelectedIngredient(ingredient);
    // 💬: Close suggestions
    setShowSuggestions(false);
  };

  // 💬: Filter ingredients where the ingredient props include the value of searchText
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.strIngredient.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col relative w-full z-40">
      <div className="relative w-full">
        {/* 💬: Search Input */}
        <input
          placeholder="Search for recipes by main ingredient"
          type="search"
          value={searchText}
          onChange={handleInputChange}
          className="border-[1px] w-full border-[#98A2B3] pl-10 placeholder:text-[#98A2B3] p-3 placeholder:text-sm rounded-md focus:outline-none focus:ring-blue-300 focus:ring-1 h-10"
        />
        {/* 💬: Search icon */}
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-5 w-5 text-[#98A2B3]">
          {searchIcon}
        </span>
      </div>

      {/* 💬: Suggestions List */}
      {showSuggestions && searchText && (
        <ul className="absolute top-full mt-1 w-full border bg-white shadow-md rounded-md max-h-40 overflow-y-auto">
          {filteredIngredients.length ? (
            filteredIngredients.map((ingredient) => (
              <li
                key={ingredient.idIngredient}
                className="p-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelectIngredient(ingredient)}
              >
                {ingredient.strIngredient}
              </li>
            ))
          ) : (
            <div className="p-2 text-gray-500">No ingredients found</div>
          )}
        </ul>
      )}
    </div>
  );
}
