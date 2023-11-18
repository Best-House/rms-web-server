import { AsyncBoundary } from "@/components/AsyncBoundary";
import { 라우트 } from "@/constants/route";
import { useQueryRecipes } from "@/modules/recipe/useRecipe";
import { RightOutlined } from "@ant-design/icons";
import { Button, List, Typography, Flex } from "antd";
import { useRouter } from "next/router";

export function RecipeListPage() {
  return (
    <AsyncBoundary>
      <Page />
    </AsyncBoundary>
  );
}

function Page() {
  const { data } = useQueryRecipes();
  const router = useRouter();

  return (
    <List
      style={{ width: 600 }}
      header={<Typography.Title>레시피 조회</Typography.Title>}
      footer={
        <Flex justify="end">
          <Button
            type="primary"
            onClick={() => {
              router.push({ pathname: 라우트.레시피_등록 });
            }}
          >
            추가하기
          </Button>
        </Flex>
      }
      bordered={true}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{
            display: "flex",
            justifyContent: "stretch",
            padding: 20,
          }}
        >
          <Typography.Text style={{ flex: 1 }}>{item.name}</Typography.Text>
          <RightOutlined />
        </List.Item>
      )}
    />
  );
}
