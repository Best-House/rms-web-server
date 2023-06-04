import { MaterialForm } from "@/components/MaterialForm";
import { useMutateMaterial, useQueryMaterial } from "@/hooks/useMaterial";
import { assert } from "@toss/assert";
import { withAsyncBoundary } from "@toss/async-boundary";
import { useQueryParam } from "@toss/use-query-param";
import { Button, Popconfirm, message } from "antd";
import Router, { useRouter } from "next/router";

function Page() {
  const id = useQueryParam("id", { suspense: true });
  assert(id, "id가 필요합니다.");

  const router = useRouter();
  const { data } = useQueryMaterial({ id });
  const { update, remove } = useMutateMaterial();

  return (
    <>
      <MaterialForm
        defaultValues={{
          name: data.name,
          price: data.priceInfo?.price,
          amount: data.priceInfo?.amount,
        }}
        onSubmit={async (fields) => {
          await update.mutateAsync({ id, ...fields });
          Router.back();
          message.success("원자재를 수정하였습니다.");
        }}
      />
      <Popconfirm
        placement="bottom"
        title="정말로 삭제하시겠어요?"
        onConfirm={async () => {
          await remove.mutateAsync({ id });
          router.back();
          message.success("원자재를 삭제하였습니다.");
        }}
        okText="네"
        cancelText="아니요"
      >
        <Button danger>삭제</Button>
      </Popconfirm>
    </>
  );
}

export const MaterialEditPage = withAsyncBoundary(Page, {
  pendingFallback: null,
  rejectedFallback: () => null,
});
