import { 라우트 } from "@/constants/route";
import { Button } from "antd";
import { useRouter } from "next/router";

export function MainPage() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          router.push({ pathname: 라우트.원자재_조회 });
        }}
        style={{ marginRight: 8 }}
      >
        원자재 조회
      </Button>
      <Button
        onClick={() => {
          router.push({ pathname: 라우트.레시피_조회 });
        }}
      >
        레시피 조회
      </Button>
    </>
  );
}
