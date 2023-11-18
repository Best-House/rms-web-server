import { Button, Result } from "antd";

interface Props {
  error: unknown;
}

export function ErrorResult({ error }: Props) {
  return (
    <Result
      status="warning"
      title={
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다."
      }
      extra={<Button onClick={() => {}}>새로고침</Button>}
    />
  );
}
