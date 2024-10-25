// SECTION: Import Statements
import SearchInput from "@/components/SearchInput/SearchInput";
import {
  IRecipeIngredients,
  IRecipeIngredientsResponse,
} from "@/models/interfacesTypes";

// SECTION: Async Operations
async function getAllIngredients(): Promise<IRecipeIngredients[]> {
  try {
    // Make request to API endpoint; Next.js 15 introduces a number of changes, including a change in caching strategy whereby it is no longer caching by default. As such, it is necessary to cache the data when required.
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
      { method: "GET", cache: "force-cache" }
    );
    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`Error fetching ingredients: status - ${res.status}`);
    }

    // Convert payload to JSON format
    const data: IRecipeIngredientsResponse = await res.json();
    return data.meals;
  } catch (err) {
    console.error("Failed to fetch ingredients:", err);
    return [];
  }
}

export default async function Home() {
  //
  const ingredients = await getAllIngredients();
  //
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {/* Search Input */}
      <SearchInput />
    </div>
  );
}
