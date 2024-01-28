import { test, expect } from "@playwright/test";
import {
  원자재_삭제_유즈케이스,
  원자재_생성_유즈케이스,
  원자재_수정_유즈케이스,
} from "./원자재_유즈케이스";

test("메뉴 관리자는 원자재를 등록할 수 있다.", async ({ page }) => {
  //when
  const 원자재이름 = "원자재_" + "원자재_생성_테스트";
  await 원자재_생성_유즈케이스(page, {
    name: 원자재이름,
    amount: "1000",
  });

  //then
  await expect(page.getByText(원자재이름, { exact: true })).toBeVisible();

  //cleanup
  await 원자재_삭제_유즈케이스(page, { name: 원자재이름 });
});

test("메뉴 관리자는 원자재를 수정할 수 있다.", async ({ page }) => {
  //given
  const 원자재이름 = "원자재_" + "원자재_수정_테스트";
  await 원자재_생성_유즈케이스(page, {
    name: 원자재이름,
    amount: "1000",
  });

  //when
  const 수정된_원자재이름 = "수정된_" + 원자재이름;
  await 원자재_수정_유즈케이스(page, {
    name: 원자재이름,
    newName: 수정된_원자재이름,
  });

  //then
  await expect(page.getByText("원자재를 수정하였습니다.")).toBeVisible();
  await expect(page.getByText(원자재이름, { exact: true })).not.toBeVisible();
  await expect(
    page.getByText(수정된_원자재이름, { exact: true }),
  ).toBeVisible();

  //cleanup
  await 원자재_삭제_유즈케이스(page, { name: 수정된_원자재이름 });
});

test("메뉴 관리자는 원자재를 삭제할 수 있다.", async ({ page }) => {
  //given
  const 원자재이름 = "원자재_" + "원자재_삭제_테스트";
  await 원자재_생성_유즈케이스(page, {
    name: 원자재이름,
    amount: "1000",
  });

  //when
  await 원자재_삭제_유즈케이스(page, { name: 원자재이름 });

  //then
  await expect(page.getByText("원자재를 삭제하였습니다.")).toBeVisible();
  await expect(page.getByText(원자재이름, { exact: true })).not.toBeVisible();
});
