export interface DeleteRecipe {
  deleteRecipe: (id: string) => Promise<void>;
}
