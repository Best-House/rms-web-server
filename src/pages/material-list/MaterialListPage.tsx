import { 라우트 } from "@/constants/route";
import { useQueryMaterials } from "@/hooks/useMaterial";
import { AsyncBoundary } from "@/utils/AsyncBoundary";
import { RightOutlined } from "@ant-design/icons";
import { List, Typography, Button, Flex } from "antd";
import { useRouter } from "next/router";

export function MaterialListPage() {
  return (
    <AsyncBoundary>
      <Page />
    </AsyncBoundary>
  );
}

function Page() {
  const { data } = useQueryMaterials();
  const router = useRouter();

  return (
    <List
      style={{ width: 600 }}
      header={<Typography.Title>원자재 조회</Typography.Title>}
      footer={
        <Flex justify="end">
          <Button
            type="primary"
            onClick={() => {
              router.push({ pathname: 라우트.원자재_등록 });
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
          <RightOutlined
            onClick={() => {
              router.push({
                pathname: 라우트.원자재_수정,
                query: { id: item.id },
              });
            }}
          />
        </List.Item>
      )}
    />
  );
}
