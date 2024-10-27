"use server"

import { IRecipeIngredients, IRecipeIngredientsResponse } from "@/models/interfacesTypes";

interface IMealFetch {
    mainIngredient: IRecipeIngredients;
}

export async function fetchMeals({mainIngredient}: IMealFetch): Promise<IRecipeIngredients[]> {
    try {
    // Make request to API endpoint; Next.js 15 introduces a number of changes, including a change in caching strategy whereby it is no longer caching by default. As such, it is necessary to cache the data when required.
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`,
      { method: "GET", cache: "force-cache" }
    );
    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`Error fetching ingredients: status - ${res.status}`);
    }

    // Convert payload to JSON format
    const { meals }: IRecipeIngredientsResponse = await res.json();
    return meals;
  } catch (err) {
    console.error("Failed to fetch ingredients:", err);
    return [];
  }
}