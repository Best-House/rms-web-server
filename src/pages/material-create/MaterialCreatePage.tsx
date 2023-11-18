import { MaterialForm } from "@/components/MaterialForm";
import { useCreateMaterial } from "@/hooks/useMaterial";
import { Button, Card, Flex } from "antd";
import Router from "next/router";

export function MaterialCreatePage() {
  const create = useCreateMaterial();

  return (
    <Card>
      <MaterialForm
        onSubmit={async (fields) => {
          await create.mutateAsync(fields);
          Router.back();
        }}
      />
      <Flex justify="end">
        <Button type="primary" htmlType="submit" form={MaterialForm.id}>
          확인
        </Button>
      </Flex>
    </Card>
  );
}
