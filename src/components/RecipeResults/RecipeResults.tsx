"use client";
// SECTION: Import Statements
import { IRecipeIngredients } from "@/models/interfacesTypes";
import { useEffect, useState } from "react";
import RecipePreview from "./RecipePreview";

// SECTION: Interfaces and Types
interface IRecipeResults {
  selectedIngredient: IRecipeIngredients;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // Additional properties will depend on the expanded dataset from full details API
}

// 💬: The async function in the component retrieves the meals from the 'Filter by main ingredient' endpoint. The result of the API call returns the meal name, a thumbnail, and its corresponding ID. This does not provide the required information desired for display as per the UI design mockup. In order to fix this, it is necessary to undertake the following steps: (1) Perform a data fetch to retrieve the meals from the aforementioned endpoint; (2) perform a data fetch that loops over the results, and searches for each individual meal via the 'Lookup full meal details by id' endpoint. By doing this, each meal will now have an expanded dataset which can not only be displayed but be used by filtering components. It is necessary to use useEffect to perform the async operations, as opposed to an async fetch, due to the fact that a server component cannot be imported into a client component (RecipeSelector) since its becomes a client component; client components are rendered first before server components, requiring a new request to the server if imported in a client component. The way around this is to import the server component as a child prop of the client component, thus rendering them separately. This strategy however will not work in this scenario, given that state is being lifted. Another option is to store the state in the URL and access it in the server component; this would require dynamic routing, which is outside the scope of this technical audition.

export default function RecipeResults({ selectedIngredient }: IRecipeResults) {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Meal[]>([]);

  useEffect(() => {
    if (!selectedIngredient) return;

    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        // 💬: Step 1: Fetch recipes filtered by main ingredient
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient.strIngredient}`
        );
        const data = await response.json();
        const recipeSummaries = data.meals;

        if (!recipeSummaries) {
          setRecipes([]);
          setIsLoading(false);
          console.error("no meals found in the request");

          return;
        }

        // 💬: Step 2: Fetch full details for each meal
        const fullRecipes = await Promise.all(
          recipeSummaries.map(async (meal: { idMeal: string }) => {
            const mealResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const mealData = await mealResponse.json();
            // 💬: Each lookup returns an array with one meal, so return the first element in the arrya
            return mealData.meals[0];
          })
        );

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
    // <div>
    //   {isLoading ? (
    //     <p>Loading...</p>
    //   ) : meals.length ? (
    //     <div className="border-2 border-green-300">
    //       {meals.map((meal) => (
    //         <div key={meal.idMeal} className="border-2 border-red-300">
    //           <h2>{meal.strMeal}</h2>
    //           <p>{`cuisine type: ${meal.strArea}`}</p>
    //           <p>{`category: ${meal.strCategory}`}</p>
    //           {meal.strTags && <p>{`tags: ${meal?.strTags}`}</p>}
    //           {/* Additional meal details */}
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <p>No meals found for this ingredient.</p>
    //   )}
    // </div>
    <RecipePreview />
  );
}
