import { MaterialForm } from "@/components/MaterialForm";
import { Material } from "@/domain/aggregate/material/Material";
import { useMutateMaterial } from "@/hooks/useMaterial";
import Router from "next/router";

export function MaterialCreatePage() {
  const { create } = useMutateMaterial();

  return (
    <MaterialForm
      onSubmit={async (fields) => {
        await create.mutateAsync(fields);
        Router.back();
      }}
    />
  );
}
