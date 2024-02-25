import { Recipe, RecipeService } from "@/domain/model/recipe";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getRecipeAPIClient } from "@/external-interfaces/api";

export function useQueryRecipe({ id }: { id: Recipe["id"] }) {
  const recipeService = new RecipeService(getRecipeAPIClient());

  return useSuspenseQuery({
    queryKey: ["recipe", id],
    queryFn: () => {
      return recipeService.getRecipe(id);
    },
  });
}

export function useQueryRecipeCost({ id }: { id: Recipe["id"] }) {
  const recipeService = new RecipeService(getRecipeAPIClient());

  return useSuspenseQuery({
    queryKey: ["recipe-cost", id],
    queryFn: () => {
      return recipeService.getCost(id);
    },
  });
}

export function useQueryRecipes() {
  const recipeService = new RecipeService(getRecipeAPIClient());

  return useSuspenseQuery({
    queryKey: ["recipes"],
    queryFn: () => {
      return recipeService.getRecipeList();
    },
  });
}

function useRefetchRecipes() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.refetchQueries({ queryKey: ["recipes"] });
  };
}

function useRefetchRecipe() {
  const queryClient = useQueryClient();

  return (id) => {
    return queryClient.refetchQueries({
      queryKey: ["recipe", "recipe-cost", id],
    });
  };
}

export function useCreateRecipe() {
  const recipeService = new RecipeService(getRecipeAPIClient());
  const refetchRecipes = useRefetchRecipes();

  return useMutation({
    mutationFn: (draft: Omit<Recipe, "id">) =>
      recipeService.createRecipe(draft),
    onSuccess: () => {
      return refetchRecipes();
    },
  });
}

export function useUpdateRecipe() {
  const recipeService = new RecipeService(getRecipeAPIClient());
  const refetchRecipes = useRefetchRecipes();
  const refetchRecipe = useRefetchRecipe();

  return useMutation({
    mutationFn: (draft: Recipe) => recipeService.updateRecipe(draft),
    onSuccess: (_, draft) => {
      return Promise.all([refetchRecipes(), refetchRecipe(draft.id)]);
    },
  });
}

export function useDeleteRecipe() {
  const recipeService = new RecipeService(getRecipeAPIClient());
  const refetchRecipes = useRefetchRecipes();

  return useMutation({
    mutationFn: (id: Recipe["id"]) => recipeService.deleteRecipe(id),
    onSuccess: () => {
      return refetchRecipes();
    },
  });
}
