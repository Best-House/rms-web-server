import { expect, test } from "@playwright/test";

test("메뉴 관리자는 레시피를 등록, 수정, 삭제할 수 있다.", async ({ page }) => {
  // 1. 메뉴 관리자는 레시피를 등록할 수 있다.
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "레시피 조회" }).click();
  await page.getByRole("button", { name: "추가하기" }).click();
  await page.getByLabel("레시피 이름 입력").click();
  await page.getByLabel("레시피 이름 입력").fill("새로운 레시피 이름");
  await page.getByLabel("1번째 원자재 선택").first().click();
  await page.getByText("원두").click();
  await page.getByLabel("1번째 원자재 양 입력").click();
  await page.getByLabel("1번째 원자재 양 입력").fill("10");
  await page.getByRole("button", { name: "확인" }).click();
  await expect(page.getByText("새로운 레시피 이름")).toBeVisible();

  // 2. 메뉴 관리자는 레시피를 수정할 수 있다.
  await page.getByLabel("레시피 이름 수정하기").locator("svg").click();
  await page.getByLabel("레시피 이름 입력").click();
  await page.getByLabel("레시피 이름 입력").fill("수정된 레시피 이름");
  await page.getByRole("button", { name: "확인" }).click();

  await expect(page.getByText("레시피를 수정하였습니다.")).toBeVisible();
  await expect(page.getByText("새로운 레시피 이름")).not.toBeVisible();
  await expect(page.getByText("수정된 레시피 이름")).toBeVisible();

  // 3. 메뉴 관리자는 레시피를 삭제할 수 있다.
  await page.getByLabel("수정된 레시피 이름 수정하기").locator("svg").click();
  await page.getByRole("button", { name: "삭제" }).click();
  await page.getByRole("button", { name: "네" }).click();
  await expect(page.getByText("레시피를 삭제하였습니다.")).toBeVisible();
  await expect(page.getByText("수정된 레시피 이름")).not.toBeVisible();
});
