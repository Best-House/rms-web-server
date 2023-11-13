import { 라우트 } from "@/constants/route";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          router.push({ pathname: 라우트.원자재_조회 });
        }}
      >
        원자재 조회
      </button>
      <button
        onClick={() => {
          router.push({ pathname: 라우트.레시피_조회 });
        }}
      >
        레시피 조회
      </button>
    </>
  );
}
