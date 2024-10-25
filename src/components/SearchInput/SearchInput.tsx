"use client";
// SECTION: Import Statements
import { searchIcon } from "@/icons/icons";
import { IRecipeIngredients } from "@/models/interfacesTypes";
import { ChangeEvent, useState } from "react";

// SECTION: Interface & Types
interface SearchInputProps {
  ingredients: IRecipeIngredients[];
  setSelectedIngredient: (ingredient: IRecipeIngredients) => void;
}

export default function SearchInput({ ingredients }: SearchInputProps) {
  // 💬: Establish state to store the user input, allowing for the ingredients based on the value of the searchText variable
  const [searchText, setSearchText] = useState<string>("");

  const [selectedIngredient, setSelectedIngredient] =
    useState<IRecipeIngredients | null>(null);

  // 💬: Filter ingredients where the ingredient props includes the value of the searchText variable, providing a suggestion functionality as the user types
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.strIngredient.toLowerCase().includes(searchText.toLowerCase())
  );

  // 💬: Updates the searchText variable whenever the user types, triggering a re-render of the filteredIngredients variable.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSelectedIngredient(null); // Clear selected ingredient if the user starts typing again
  };

  // 💬: Handler function that handles the selection of the ingredient from list
  const handleSelectIngredient = (ingredient: IRecipeIngredients) => {
    // 💬: Update input field with selected ingredient
    setSearchText(ingredient.strIngredient);
    // 💬: Set selected ingredient in state
    setSelectedIngredient(ingredient);
  };

  return (
    <div className="flex flex-col relative w-[24rem]">
      {/* Search Input */}
      <input
        placeholder="Search for ingredients..."
        type="search"
        value={searchText}
        onChange={handleInputChange}
        className="border-[1px] w-full border-[##98A2B3] flex items-center justify-center placeholder:text-[#98A2B3] pr-12 p-3 placeholder:text-sm rounded-md focus:outline-none focus:ring-offset-2 focus:ring-blue-300 focus:ring-1 h-10 capitalize"
      />
      {/* Search Button */}
      <button className="absolute bottom-0 right-0 h-full px-2.5 rounded-r-md bg-blue-400 group-focus-within:bg-blue-600 transition-all ease-in duration-400">
        <span className="flex items-center justify-center h-5 w-5 text-[#f4f4f4]">
          {searchIcon}
        </span>
      </button>

      {/* 💬: Suggestions List - Loop over the props passed into the component (cached result of the data fetch) and return values from the prop that match the user input based on whether it includes a certain value among its entries. Once an option has been selected, the suggestion list closes */}
      {searchText && !selectedIngredient && (
        <ul className="absolute top-full mt-1 w-full border bg-white shadow-md rounded-md max-h-40 overflow-y-auto">
          {/* 💬: If the searched ingredient is found in the ingredients prop, return a UI that displays the list with an onClick handle for logic once it has been selected; otherwise display an element that informs the user that no ingredient matching their query was found. */}
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
