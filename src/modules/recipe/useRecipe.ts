import { Recipe } from "@/domain/aggregate/recipe/Recipe";
import { httpApiClient } from "@/remotes/https/HttpApiClient";
import { RecipeService } from "@/service/RecipeService";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useQueryRecipe({ id }: { id: Recipe["id"] }) {
  const recipeService = new RecipeService(httpApiClient);

  return useSuspenseQuery({
    queryKey: ["recipes", id],
    queryFn: () => {
      return recipeService.getRecipe({ id });
    },
  });
}

export function useQueryRecipes() {
  const recipeService = new RecipeService(httpApiClient);

  return useSuspenseQuery({
    queryKey: ["recipes"],
    queryFn: () => {
      return recipeService.getRecipes();
    },
  });
}

function useRefetchRecipes() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.refetchQueries({ queryKey: ["recipes"] });
  };
}

export function useCreateRecipe() {
  const recipeService = new RecipeService(httpApiClient);
  const refetch = useRefetchRecipes();

  return useMutation({
    mutationFn: (...params: Parameters<RecipeService["createRecipe"]>) =>
      recipeService.createRecipe(...params),
    onSuccess: refetch,
  });
}

export function useUpdateRecipe() {
  const recipeService = new RecipeService(httpApiClient);
  const refetch = useRefetchRecipes();

  return useMutation({
    mutationFn: (...params: Parameters<RecipeService["updateRecipe"]>) =>
      recipeService.updateRecipe(...params),
    onSuccess: refetch,
  });
}

export function useDeleteRecipe() {
  const recipeService = new RecipeService(httpApiClient);
  const refetch = useRefetchRecipes();

  return useMutation({
    mutationFn: (...params: Parameters<RecipeService["deleteRecipe"]>) =>
      recipeService.deleteRecipe(...params),
    onSuccess: refetch,
  });
}
