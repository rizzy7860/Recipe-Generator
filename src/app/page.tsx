// SECTION: Import Statements
import RecipeSelector from "@/components/RecipeSelector/RecipeSelector";
import {
  IRecipeIngredients,
  IRecipeIngredientsResponse,
} from "@/models/interfacesTypes";
import Image from "next/image";

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
    const { meals }: IRecipeIngredientsResponse = await res.json();
    return meals;
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
    <div className="h-screen grid grid-cols-5">
      {/* 💬: Recipe Preview Section */}
      <div className="col-span-2 p-3">
        {/* 💬: Page title and functionality description */}
        <div className="flex flex-col justify-center p-3 gap-2">
          <h1 className="text-2xl font-semibold">{`What's in your pantry?`}</h1>
          <p className="text-gray-400 leading-relaxed text-sm">
            Use the search bar below to search for recipes based on the main
            ingredient that you have available.
          </p>
        </div>
        {/* 💬: Search Input: parent component to the SearchInput and MealResults components, created for the purposes of lifting state from SearchInput (the selected ingredient specifically) to be used in MealResults */}
        <div className="px-2">
          <RecipeSelector ingredients={ingredients} />
        </div>
      </div>
      {/* 💬: Full Recipe Display */}
      <div className="col-span-3 col-start-3 border-l border-gray-200">
        <div className="mt-72 w-full flex justify-center items-center flex-col flex-wrap gap-6">
          <Image
            src={"/chef-clipart.svg"}
            width={200}
            height={200}
            alt="clipart of a chef"
            className="opacity-15"
          />
          <p className="text-gray-300 max-w-80 text-center text-sm leading-relaxed">
            A delectable world awaits! Once you've searched for a recipe in the
            hand panel, select it view it here in greater detail
          </p>
        </div>
      </div>
    </div>
  );
}
