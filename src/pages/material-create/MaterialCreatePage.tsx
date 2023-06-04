import { Material } from "@/domain/aggregate/material/Material";
import { useMutateMaterial } from "@/hooks/useMaterial";
import { Form, Input, Checkbox, Button, InputNumber } from "antd";
import Router from "next/router";
import { Controller, useForm } from "react-hook-form";

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

interface Fields {
  name: Material["name"];
  price: number;
  amount: number;
}

function MaterialForm({ onSubmit }: { onSubmit: (fields: Fields) => void }) {
  const { handleSubmit, watch, control } = useForm<Fields>();

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onSubmit)}
      onFinishFailed={() => {}}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => {
          return (
            <Form.Item label="원자재 이름">
              <Input {...field} />
            </Form.Item>
          );
        }}
      />

      <Controller
        control={control}
        name="price"
        render={({ field }) => {
          return (
            <Form.Item label="원자재 가격">
              <InputNumber addonAfter="원" {...field} />
            </Form.Item>
          );
        }}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field }) => {
          return (
            <Form.Item label="원자재 양">
              <InputNumber addonAfter="g" {...field} />
            </Form.Item>
          );
        }}
      />

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          확인
        </Button>
      </Form.Item>
    </Form>
  );
}
