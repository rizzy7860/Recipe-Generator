"use client";
// SECTION: Import Statements
import { IRecipeIngredients, IRecipe } from "@/models/interfacesTypes";
import { useEffect, useState } from "react";
import RecipePreview from "./RecipePreview";
import RecipePreviewSkeleton from "./RecipePreviewSkeleton";
import RecipeFilter from "../Filters/RecipeFilter";

// SECTION: Interfaces and Types
interface IRecipeResults {
  selectedIngredient: IRecipeIngredients;
}

// 💬: The async function in the component retrieves the meals from the 'Filter by main ingredient' endpoint. The result of the API call returns the meal name, a thumbnail, and its corresponding ID. This does not provide the required information desired for display as per the UI design mockup. In order to fix this, it is necessary to undertake the following steps: (1) Perform a data fetch to retrieve the meals from the aforementioned endpoint; (2) perform a data fetch that loops over the results, and searches for each individual meal via the 'Lookup full meal details by id' endpoint. By doing this, each meal will now have an expanded dataset which can not only be displayed but be used by filtering components. It is necessary to use useEffect to perform the async operations, as opposed to an async fetch, due to the fact that a server component cannot be imported into a client component (RecipeSelector) since its becomes a client component; client components are rendered first before server components, requiring a new request to the server if imported in a client component. The way around this is to import the server component as a child prop of the client component, thus rendering them separately. This strategy however will not work in this scenario, given that state is being lifted. Another option is to store the state in the URL and access it in the server component; this would require dynamic routing, which is outside the scope of this technical audition.

export default function RecipeResults({ selectedIngredient }: IRecipeResults) {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedIngredient) return;

    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        // 💬: A delay timer to showcase a skeleton loading component
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // 💬: Step 1: Fetch recipes filtered by main ingredient
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient.strIngredient}`
        );
        const data = await response.json();
        const recipeSummaries = data.meals;

        if (!recipeSummaries) {
          setRecipes([]);
          setIsLoading(false);
          console.log("no meals found in the request");
          return;
        }

        // 💬: Step 2: Fetch full details for each meal
        const fullRecipes = await Promise.all(
          recipeSummaries.map(async (meal: { idMeal: string }) => {
            const mealResponse = await fetch(
              `/api/mealLookup?id=${meal.idMeal}`
            );
            const mealData = await mealResponse.json();
            return mealData.meals[0];
          })
        );

        // 💬: Aggregating unique categories and areas
        const uniqueCategories = new Set<string>();
        const uniqueAreas = new Set<string>();

        fullRecipes.forEach((recipe) => {
          if (recipe.strCategory) uniqueCategories.add(recipe.strCategory);
          if (recipe.strArea) uniqueAreas.add(recipe.strArea);
        });

        setCategories(Array.from(uniqueCategories));
        setAreas(Array.from(uniqueAreas));
        setRecipes(fullRecipes);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedIngredient]);
  //
  return (
    <div>
      {isLoading ? (
        <div className="space-y-2">
          <RecipePreviewSkeleton />
          <RecipePreviewSkeleton />
          <RecipePreviewSkeleton />
        </div>
      ) : recipes.length ? (
        // Recipe & Filters
        <div className="">
          {/* Wrapper */}
          <div className="p-1">
            {/* Title */}
            <h4 className="text-sm text-slate-700 ml-0.5">Filter by</h4>
            {/* Filters */}
            <div className="gap-2 py-2 flex flex-row flex-wrap">
              <RecipeFilter filterCategory="Cuisine" filterData={areas} />
              <RecipeFilter
                filterCategory="Recipe Type"
                filterData={categories}
              />
            </div>
          </div>
          {/* Recipe Previews */}
          <div className="space-y-2">
            {recipes.map((recipe) => (
              <RecipePreview key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-700">
          No recipes were found, please try another ingredient.
        </p>
      )}
    </div>
  );
}
