import { MaterialScheme } from "@/domain/model/material/Material";
import { Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";

interface Fields extends Omit<MaterialScheme, "id"> {}

export function MaterialForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (fields: Fields) => void;
  defaultValues?: Fields;
}) {
  const { handleSubmit, control } = useForm<Fields>({ defaultValues });

  return (
    <Form
      id={MaterialForm.id}
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
              <Input aria-label="원자재 이름 입력" {...field} />
            </Form.Item>
          );
        }}
      />
      <Controller
        control={control}
        name="defaultUnitPrice"
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label="단위당 가격"
              help={error?.message}
              validateStatus={error != null ? "error" : undefined}
            >
              <Input aria-label="단위당 가격 입력" {...field} />
            </Form.Item>
          );
        }}
      />
    </Form>
  );
}

MaterialForm.id = "material-form";
