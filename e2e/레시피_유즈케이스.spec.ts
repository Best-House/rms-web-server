import { expect, test } from "@playwright/test";
import {
  레시피_삭제_유즈케이스,
  레시피_생성_유즈케이스,
  레시피_수정_유즈케이스,
} from "./레시피_유즈케이스";

test("메뉴관리자는 레시피를 생성할 수 있다.", async ({ page }) => {
  //given
  const 레시피이름 = "레시피_" + "레시피_생성_테스트";

  //when
  await 레시피_생성_유즈케이스(page, { name: 레시피이름 });

  //then
  await expect(page.getByText(레시피이름, { exact: true })).toBeVisible();

  //cleanup
  await 레시피_삭제_유즈케이스(page, { name: 레시피이름 });
});

test("메뉴관리자는 레시피를 수정할 수 있다.", async ({ page }) => {
  //given
  const 레시피이름 = "레시피_" + "레시피_수정_테스트";
  await 레시피_생성_유즈케이스(page, { name: 레시피이름 });

  //when
  const 수정된_레시피_이름 = "수정된_" + 레시피이름;
  await 레시피_수정_유즈케이스(page, {
    name: 레시피이름,
    newName: 수정된_레시피_이름,
  });

  //then
  await expect(page.getByText("레시피를 수정하였습니다.")).toBeVisible();
  await expect(page.getByText(레시피이름, { exact: true })).not.toBeVisible();
  await expect(
    page.getByText(수정된_레시피_이름, { exact: true }),
  ).toBeVisible();

  //cleanup
  await 레시피_삭제_유즈케이스(page, { name: 수정된_레시피_이름 });
});

test("메뉴관리자는 레시피를 삭제할 수 있다.", async ({ page }) => {
  //given
  const 레시피이름 = "레시피_" + "레시피_삭제_테스트";
  await 레시피_생성_유즈케이스(page, { name: 레시피이름 });

  //when
  await 레시피_삭제_유즈케이스(page, {
    name: 레시피이름,
  });

  //then
  await expect(page.getByText("레시피를 삭제하였습니다.")).toBeVisible();
  await expect(page.getByText(레시피이름, { exact: true })).not.toBeVisible();
});
