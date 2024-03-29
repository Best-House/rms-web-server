import { useQueryMaterials } from "@/modules/material/useMaterial";
import { AsyncBoundary } from "@/utils/AsyncBoundary";
import { RightOutlined } from "@ant-design/icons";
import { List, Typography, Flex } from "antd";

export function PurchaseListPage() {
  return (
    <AsyncBoundary>
      <Page />
    </AsyncBoundary>
  );
}

function Page() {
  const { data } = useQueryMaterials();

  return (
    <List
      style={{ width: 600 }}
      header={<Typography.Title>원자재 구매이력 조회</Typography.Title>}
      footer={
        <Flex justify="end">
          {/* <Button
            type="primary"
            onClick={() => {
              router.push({ pathname: 라우트.원자재_등록 });
            }}
          >
            추가하기
          </Button> */}
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
            aria-label={`${item.name} 수정하기`}
            onClick={() => {
              // router.push({
              //   pathname: 라우트.원자재_수정,
              //   query: { id: item.id },
              // });
            }}
          />
        </List.Item>
      )}
    />
  );
}
