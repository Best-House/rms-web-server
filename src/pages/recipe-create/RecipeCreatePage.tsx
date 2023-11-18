import { Ingredient } from "@/domain/aggregate/recipe/Ingredient";
import {} from "@/modules/material/useMaterial";
import { RecipeForm } from "@/modules/recipe/RecipeForm";
import { useCreateRecipe } from "@/modules/recipe/useRecipe";
import { Button, Card, Flex } from "antd";
import Router from "next/router";

export function RecipeCreatePage() {
  const create = useCreateRecipe();

  return (
    <Card>
      <RecipeForm
        defaultValues={{
          name: "",
          ingredients: [{ materialId: "", amount: 0 }],
        }}
        onSubmit={async (fields) => {
          const ingredients = fields.ingredients.map((ingredient) =>
            Ingredient.from(ingredient),
          );

          await create.mutateAsync({ name: fields.name, ingredients });
          Router.back();
        }}
      />
      <Flex justify="end">
        <Button type="primary" htmlType="submit" form={RecipeForm.id}>
          확인
        </Button>
      </Flex>
    </Card>
  );
}
