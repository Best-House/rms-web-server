import { MaterialForm } from "@/modules/material/MaterialForm";
import {
  useUpdateMaterial,
  useDeleteMaterial,
  useQueryMaterial,
} from "@/modules/material/useMaterial";
import { AsyncBoundary } from "@/utils/AsyncBoundary";
import { useQueryParam } from "@/utils/useQueryParam";
import { assert } from "@toss/assert";
import { Button, Popconfirm, message, Flex, Card } from "antd";
import Router, { useRouter } from "next/router";
import { Material } from "@/domain/model/material";

export function MaterialEditPage() {
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
  const { data } = useQueryMaterial({ id });
  const update = useUpdateMaterial();
  const remove = useDeleteMaterial();

  return (
    <Card>
      <MaterialForm
        defaultValues={data.json}
        onSubmit={async (fields) => {
          await update.mutateAsync(Material.from({ id, ...fields }));
          Router.back();
          message.success("원자재를 수정하였습니다.");
        }}
      />
      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          form={MaterialForm.id}
          style={{ marginRight: 8 }}
        >
          확인
        </Button>

        <Popconfirm
          placement="bottom"
          title="정말로 삭제하시겠어요?"
          onConfirm={async () => {
            await remove.mutateAsync(data.id);
            router.back();
            message.success("원자재를 삭제하였습니다.");
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
