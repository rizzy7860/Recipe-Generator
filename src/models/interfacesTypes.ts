// SECTION: Interfaces
export interface IRecipeIngredients {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: null | string;
}

export interface IRecipeIngredientsResponse {
  meals: IRecipeIngredients[];
}

export interface IRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
}

// SECTION: Types
export type IconType = React.ReactNode;
