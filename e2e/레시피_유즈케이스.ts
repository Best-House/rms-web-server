import { Page } from "@playwright/test";

/**
 * 레시피 유즈케이스
 * @link https://www.notion.so/cd196e3bfe354d2180c288a22dbd624e?pvs=4
 */

export async function 레시피_생성_유즈케이스(
  page: Page,
  recipe: {
    name: string;
  },
) {
  //1. 메뉴담당자는 레시피 생성 페이지로 이동한다.
  await page.goto("/recipe-list");
  await page.getByRole("button", { name: "추가하기" }).click();

  //2. 메뉴담당자는 레시피를 입력한다.
  await page.getByLabel("레시피 이름 입력").click();
  await page.getByLabel("레시피 이름 입력").fill(recipe.name);
  await page.getByRole("button", { name: "확인" }).click();
}

export async function 레시피_수정_유즈케이스(
  page: Page,
  recipe: { name: string; newName: string },
) {
  //1. 메뉴담당자는 수정한 레시피의 상세 페이지로 이동한다.
  await page.goto("/recipe-list");
  await page.getByLabel(`${recipe.name} 수정하기`).locator("svg").click();

  //2. 메뉴담당자는 레시피를 수정한다.
  await page.getByLabel("레시피 이름 입력").click();
  await page.getByLabel("레시피 이름 입력").fill(recipe.newName);
  await page.getByRole("button", { name: "확인" }).click();
}

export async function 레시피_삭제_유즈케이스(
  page: Page,
  recipe: { name: string },
) {
  //1. 메뉴담당자는 삭제할 레시피의 상세 페이지로 이동한다.
  await page.goto("/recipe-list");
  await page.getByLabel(`${recipe.name} 수정하기`).locator("svg").click();

  //2. 메뉴담당자는 레시피를 삭제한다.
  await page.getByRole("button", { name: "삭제" }).click();

  //3. 시스템은 메뉴담당자에세 삭제함을 한번 더 묻는다.
  await page.getByText("정말로 삭제하시겠어요?");
  await page.getByRole("button", { name: "네" }).click();
}
