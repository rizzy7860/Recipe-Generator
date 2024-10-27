// SECTION: Import Statements
import { tagIcon } from "@/icons/icons";
import { IRecipe } from "@/models/interfacesTypes";
import cn from "@/utilities/cn";
import Image from "next/image";

// SECTION: Interfaces and Types
interface IRecipePreview {
  recipe: IRecipe;
}

export default function RecipePreview({ recipe }: IRecipePreview) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md transition-shadow duration-300 ease-in-out hover:shadow-lg cursor-pointer group">
      {/* Read More */}
      <button className="p-2 py-2 text-sm font-medium flex items-center justify-start text-blue-500 bg-blue-50 group-hover:bg-blue-100 group-hover:text-blue-700 duration-300 ease-in-out transition-all rounded-t-md">
        Discover Recipe
      </button>
      <div className="flex pt-1">
        {/* Thumbnail of Recipe */}
        <Image
          alt="An image of the recipe"
          className="rounded-lg p-1 object-cover"
          src={recipe.strMealThumb}
          height={100}
          width={100}
        />
        {/* Title & Badges */}
        <div className="flex flex-col justify-center gap-1 flex-grow p-2 flex-wrap">
          <h2 className="font-medium text-lg">{recipe.strMeal}</h2>
          <div className="flex gap-2 mt-2">
            {/* Cuisine Type Badge - Area */}
            {recipe.strArea !== "Unknown" && (
              <div className="bg-gray-200 border border-gray-400 rounded-lg flex items-center justify-center flex-row p-1">
                <Image
                  src={`${recipe.strArea}.svg`}
                  height={18}
                  width={18}
                  alt={`A ${recipe.strArea} flag`}
                  className="border border-gray-200"
                />
                <p className="text-sm px-2 font-light">{recipe.strArea}</p>
              </div>
            )}
            {/* Cuisine Category Badge - Categories */}
            <div
              className={cn(
                "rounded-lg flex items-center justify-center flex-row p-1",
                {
                  "bg-teal-100 border border-teal-300 text-teal-700":
                    recipe.strCategory === "Beef",
                  "bg-yellow-100 border border-yellow-300 text-yellow-700":
                    recipe.strCategory === "Breakfast",
                  "bg-orange-100 border border-orange-300 text-orange-700":
                    recipe.strCategory === "Chicken",
                  "bg-red-100 border border-red-300 text-red-700":
                    recipe.strCategory === "Dessert",
                  "bg-green-100 border border-green-300 text-green-700":
                    recipe.strCategory === "Goat",
                  "bg-purple-100 border border-purple-300 text-purple-700":
                    recipe.strCategory === "Lamb",
                  "bg-gray-100 border border-gray-300 text-gray-700":
                    recipe.strCategory === "Miscellaneous",
                  "bg-indigo-100 border border-indigo-300 text-indigo-700":
                    recipe.strCategory === "Pasta",
                  "bg-pink-100 border border-pink-300 text-pink-700":
                    recipe.strCategory === "Pork",
                  "bg-blue-100 border border-blue-300 text-blue-700":
                    recipe.strCategory === "Seafood",
                  "bg-amber-100 border border-amber-300 text-amber-700":
                    recipe.strCategory === "Side",
                  "bg-sky-100 border border-sky-300 text-sky-700":
                    recipe.strCategory === "Starter",
                  "bg-cyan-100 border border-cyan-300 text-cyan-700":
                    recipe.strCategory === "Vegan",
                  "bg-lime-100 border border-lime-300 text-lime-700":
                    recipe.strCategory === "Vegetarian",
                }
              )}
            >
              <p className="text-sm px-2 font-light">{recipe.strCategory}</p>
            </div>
          </div>
        </div>
        {/* Recipe Tags */}
        {recipe.strTags && (
          <div className="flex flex-col gap-2 p-2 justify-start">
            {/* Split the strTags string into an array, filter out empty strings, and slice the first 3 elements */}
            {recipe.strTags
              .split(",")
              .filter((tag) => tag.trim() !== "") // Filter out empty strings
              .slice(0, 3)
              .map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="bg-slate-100 border border-slate-300 text-xs py-1 px-2 rounded-md w-fit flex flex-row items-center justify-center gap-2 capitalize"
                  >
                    {/* Tag Icon */}
                    <span className="h-3 w-3 text-slate-600">{tagIcon}</span>
                    {/* Tag */}
                    <span className="text-xs text-slate-600">{tag}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Required Ingredients & Instructions */}
      <div className="flex flex-col">
        {/* Divider */}
        <div className="border-b pt-1 border-gray-200" />
        {/* Instructions */}
        <div className="p-2 py-3 space-y-1">
          <p>Cooking Instructions</p>
          <p className="text-gray-600 line-clamp-2 text-sm leading-loose">
            {recipe.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}
