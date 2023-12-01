import { Material } from "@/domain/model/material/Material";
import { MaterialForm } from "@/modules/material/MaterialForm";
import { useCreateMaterial } from "@/modules/material/useMaterial";
import { Button, Card, Flex } from "antd";
import Router from "next/router";

export function MaterialCreatePage() {
  const create = useCreateMaterial();

  return (
    <Card>
      <MaterialForm
        onSubmit={async (fields) => {
          await create.mutateAsync(Material.from({ id: "", ...fields }));
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
