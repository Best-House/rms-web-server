import { MaterialForm } from "@/components/MaterialForm";
import { useCreateMaterial } from "@/hooks/useMaterial";
import { Button } from "antd";
import Router from "next/router";

export function MaterialCreatePage() {
  const create = useCreateMaterial();

  return (
    <>
      <MaterialForm
        onSubmit={async (fields) => {
          await create.mutateAsync(fields);
          Router.back();
        }}
      />
      <Button type="primary" htmlType="submit" form={MaterialForm.id}>
        확인
      </Button>
    </>
  );
}
