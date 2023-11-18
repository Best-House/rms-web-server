import { AsyncBoundary } from "@/components/AsyncBoundary";
import { Ingredient } from "@/domain/aggregate/recipe/Ingredient";
import { useQueryParam } from "@/hooks/useQueryParam";
import {} from "@/modules/material/useMaterial";
import { RecipeForm } from "@/modules/recipe/RecipeForm";
import {
  useDeleteRecipe,
  useQueryRecipe,
  useUpdateRecipe,
} from "@/modules/recipe/useRecipe";
import { assert } from "@toss/assert";
import { Button, Card, Flex, Popconfirm, message } from "antd";
import Router, { useRouter } from "next/router";

export function RecipeEditPage() {
  return (
    <AsyncBoundary>
      <Page />
    </AsyncBoundary>
  );
}

function Page() {
  const id = useQueryParam("id", { suspense: true });
  assert(id, "id가 필요합니다.");

  const router = useRouter();
  const { data } = useQueryRecipe({ id });
  const update = useUpdateRecipe();
  const remove = useDeleteRecipe();

  return (
    <Card>
      <RecipeForm
        defaultValues={data.json}
        onSubmit={async (fields) => {
          const ingredients = fields.ingredients.map((ingredient) =>
            Ingredient.from(ingredient),
          );
          await update.mutateAsync({ ...fields, ingredients });
          Router.back();
          message.success("레시피를 수정하였습니다.");
        }}
      />
      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          form={RecipeForm.id}
          style={{ marginRight: 8 }}
        >
          확인
        </Button>

        <Popconfirm
          placement="bottom"
          title="정말로 삭제하시겠어요?"
          onConfirm={async () => {
            await remove.mutateAsync({ id });
            router.back();
            message.success("레시피를 삭제하였습니다.");
          }}
          okText="네"
          cancelText="아니요"
        >
          <Button danger={true}>삭제</Button>
        </Popconfirm>
      </Flex>
    </Card>
  );
}