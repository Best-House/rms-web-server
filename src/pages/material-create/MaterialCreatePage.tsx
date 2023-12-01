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
          if (fields.defaultUnitPrice == null) {
            throw new Error("defaultUnitPrice is not null");
          }

          await create.mutateAsync({
            name: fields.name,
            defaultUnitPrice: fields.defaultUnitPrice,
          });
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
