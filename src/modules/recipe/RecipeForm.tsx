import { Ingredient } from "@/domain/model/recipe/Ingredient";
import { Recipe } from "@/domain/model/recipe/Recipe";
import { Button, Divider, Flex, Form, Input, Select } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useQueryMaterials } from "../material/useMaterial";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { AsyncBoundary } from "@/utils/AsyncBoundary";

interface Fields {
  id?: Recipe["id"];
  name: Recipe["name"];
  ingredients: {
    materialId: Ingredient["materialId"];
    amount: Ingredient["amount"];
  }[];
}

interface Props {
  onSubmit: (fields: Fields) => void;
  defaultValues?: Fields;
}

export function RecipeForm(props: Props) {
  return (
    <AsyncBoundary>
      <_Form {...props} />
    </AsyncBoundary>
  );
}

export function _Form({ onSubmit, defaultValues }: Props) {
  const { handleSubmit, control } = useForm<Fields>({ defaultValues });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const { data } = useQueryMaterials();

  return (
    <Form
      id={RecipeForm.id}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Controller
        aria-label="레시피 이름 입력"
        control={control}
        name="name"
        rules={{ required: "이름을 입력해주세요." }}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label="레시피 이름"
              required={true}
              help={error?.message}
              validateStatus={error != null ? "error" : undefined}
            >
              <Input aria-label="레시피 이름 입력" {...field} />
            </Form.Item>
          );
        }}
      />
      <Divider />
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Controller
              control={control}
              name={`ingredients.${index}.materialId`}
              rules={{ required: "원자재를 입력해주세요." }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Form.Item
                    label="원자재"
                    required={true}
                    help={error?.message}
                    validateStatus={error != null ? "error" : undefined}
                  >
                    <Select
                      aria-label={`${index + 1}번째 원자재 선택`}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      options={data.map((x) => ({
                        label: x.name,
                        value: x.id,
                      }))}
                    />
                  </Form.Item>
                );
              }}
            />
            <Controller
              key={index}
              control={control}
              name={`ingredients.${index}.amount`}
              rules={{
                required: "양을 입력해주세요.",
                validate: (x) => (x > 0 ? true : "1 이상의 양을 입력해주세요."),
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Form.Item
                    aria-label={`${index + 1}번째 원자재 양 입력`}
                    label="양"
                    required={true}
                    help={error?.message}
                    validateStatus={error != null ? "error" : undefined}
                  >
                    <Input {...field} />
                  </Form.Item>
                );
              }}
            />
          </div>
        );
      })}
      <Flex justify="end">
        <Button
          onClick={() => {
            append({ materialId: "", amount: 0 });
          }}
          icon={<PlusOutlined />}
          style={{ marginRight: 8 }}
        />
        <Button
          onClick={() => {
            remove(fields.length - 1);
          }}
          icon={<MinusOutlined />}
        />
      </Flex>
      <Divider />
    </Form>
  );
}

RecipeForm.id = "recipe-form";
