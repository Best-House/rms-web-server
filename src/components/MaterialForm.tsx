import { Material } from "@/domain/aggregate/material/Material";
import { Form, Input, InputNumber, Button } from "antd";
import { useForm, Controller } from "react-hook-form";

interface Fields {
  name: Material["name"];
  price?: number;
  amount?: number;
}

export function MaterialForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (fields: Fields) => void;
  defaultValues?: Fields;
}) {
  const { handleSubmit, watch, control } = useForm<Fields>({ defaultValues });

  console.log(watch());

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="name"
        rules={{ required: "이름을 입력해주세요." }}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label="원자재 이름"
              required={true}
              help={error?.message}
              validateStatus={error != null ? "error" : undefined}
            >
              <Input {...field} />
            </Form.Item>
          );
        }}
      />

      <Controller
        control={control}
        name="price"
        rules={{
          validate: (value) => {
            if (value != null) {
              if (Number.isNaN(Number(value))) {
                return "숫자를 입력해주세요.";
              }

              if (value < 0) {
                return "0 이상의 숫자를 입력해주세요.";
              }

              return true;
            }
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label="원자재 가격"
              help={error?.message}
              validateStatus={error != null ? "error" : undefined}
            >
              <Input addonAfter="원" {...field} />
            </Form.Item>
          );
        }}
      />

      <Controller
        control={control}
        name="amount"
        rules={{
          validate: (value) => {
            if (value != null) {
              if (Number.isNaN(Number(value))) {
                return "숫자를 입력해주세요.";
              }

              if (value <= 0) {
                return "0 초과의 숫자를 입력해주세요.";
              }

              return true;
            }
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label="원자재 양"
              help={error?.message}
              validateStatus={error != null ? "error" : undefined}
            >
              <Input {...field} />
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
