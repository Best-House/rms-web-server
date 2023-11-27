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
    queryKey: ["recipe", id],
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

function useRefetchRecipe() {
  const queryClient = useQueryClient();

  return (id) => {
    return queryClient.refetchQueries({ queryKey: ["recipe", id] });
  };
}

export function useCreateRecipe() {
  const recipeService = new RecipeService(httpApiClient);
  const refetchRecipes = useRefetchRecipes();
  const refetchRecipe = useRefetchRecipe();

  return useMutation({
    mutationFn: (...params: Parameters<RecipeService["createRecipe"]>) =>
      recipeService.createRecipe(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchRecipes(), refetchRecipe(id)]);
    },
  });
}

export function useUpdateRecipe() {
  const recipeService = new RecipeService(httpApiClient);
  const refetchRecipes = useRefetchRecipes();
  const refetchRecipe = useRefetchRecipe();

  return useMutation({
    mutationFn: (...params: Parameters<RecipeService["updateRecipe"]>) =>
      recipeService.updateRecipe(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchRecipes(), refetchRecipe(id)]);
    },
  });
}

export function useDeleteRecipe() {
  const recipeService = new RecipeService(httpApiClient);
  const refetchRecipes = useRefetchRecipes();
  const refetchRecipe = useRefetchRecipe();

  return useMutation({
    mutationFn: (...params: Parameters<RecipeService["deleteRecipe"]>) =>
      recipeService.deleteRecipe(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchRecipes(), refetchRecipe(id)]);
    },
  });
}
