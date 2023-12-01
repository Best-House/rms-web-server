import { test, expect } from "@playwright/test";
import { delay } from "@toss/utils";

test("원자재추가삭제", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "원자재 조회" }).click();
  await page.getByRole("button", { name: "추가하기" }).click();
  await page.getByLabel("원자재 이름 입력").click();
  await page.getByLabel("원자재 이름 입력").fill("원자재추가삭제");
  await page.getByLabel("단위당 가격 입력").click();
  await page.getByLabel("단위당 가격 입력").fill("1000");
  await page.getByRole("button", { name: "확인" }).click();
  await expect(page.getByText("원자재추가삭제")).toBeVisible();
  await page.getByLabel("원자재추가삭제 수정하기").locator("svg").click();
  await page.getByRole("button", { name: "삭제" }).click();
  await page.getByRole("button", { name: "네" }).click();
  await expect(page.getByText("원자재추가삭제")).not.toBeVisible();
  await delay(2000);
  await expect(page).toHaveScreenshot();
});
