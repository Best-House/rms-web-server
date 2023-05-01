import { Flex } from "@/styles/utils";
import { RightOutlined } from "@ant-design/icons";
import { Button, List, Space, Typography } from "antd";

const data = ["아메리카노", "카페라떼", "카페모카", "초콜릿라떼", "녹차라떼"];

export function RecipeListPage() {
  return (
    <List
      style={{ width: 600 }}
      header={<Typography.Title>레시피 조회</Typography.Title>}
      footer={
        <Flex justify="end">
          <Button type="primary">추가하기</Button>
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
          <Typography.Text style={{ flex: 1 }}>{item}</Typography.Text>
          <RightOutlined />
        </List.Item>
      )}
    />
  );
}
