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

// SECTION: Types
export type IconType = React.ReactNode;
