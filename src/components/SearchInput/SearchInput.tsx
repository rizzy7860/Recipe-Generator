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
      {/* Search Input */}
      <input
        placeholder="Search for ingredients..."
        type="search"
        value={searchText}
        onChange={handleInputChange}
        className="border-[1px] w-full border-[#98A2B3] flex items-center justify-center placeholder:text-[#98A2B3] pr-12 p-3 placeholder:text-sm rounded-md focus:outline-none focus:ring-blue-300 focus:ring-1 h-10 capitalize"
      />
      {/* Search Button */}
      <button className="absolute bottom-0 right-0 h-full px-2.5 rounded-r-md bg-blue-400 group-focus-within:bg-blue-600 transition-all ease-in duration-400">
        <span className="flex items-center justify-center h-5 w-5 text-[#f4f4f4]">
          {searchIcon}
        </span>
      </button>

      {/* 💬: Suggestions List */}
      {showSuggestions && searchText && (
        <ul className="absolute top-full mt-1 w-full border bg-white shadow-md rounded-md max-h-40 overflow-y-auto">
          {filteredIngredients.length ? (
            filteredIngredients.map((ingredient) => (
              <li
                key={ingredient.idIngredient}
                className="p-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelectIngredient(ingredient)} // Select ingredient
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
