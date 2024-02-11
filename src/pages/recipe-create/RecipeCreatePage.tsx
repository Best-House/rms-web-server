import { Recipe } from "@/domain/model/recipe";
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
          ingredients: [],
        }}
        onSubmit={async (fields) => {
          await create.mutateAsync(Recipe.from({ id: "", ...fields }));
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
