import { Page } from "@playwright/test";

/**
 * 원자재 유즈케이스
 * @link https://www.notion.so/112fdf4cef3244c6b9d0316e358f03d9?pvs=4
 */

export async function 원자재_생성_유즈케이스(
  page: Page,
  material: {
    name: string;
    amount: string;
  },
) {
  //1. 메뉴담당자는 원자재 생성 페이지로 이동한다.
  await page.goto("/material-list");
  await page.getByRole("button", { name: "추가하기" }).click();

  //2. 메뉴담당자는 원자재를 입력한다.
  await page.getByLabel("원자재 이름 입력").click();
  await page.getByLabel("원자재 이름 입력").fill(material.name);
  await page.getByLabel("단위당 가격 입력").click();
  await page.getByLabel("단위당 가격 입력").fill(material.amount);
  await page.getByRole("button", { name: "확인" }).click();
}

export async function 원자재_수정_유즈케이스(
  page: Page,
  material: {
    name: string;
    newName: string;
  },
) {
  //1. 메뉴담당자는 수정할 원자재의 상세 페이지로 이동한다.
  await page.goto("/material-list");
  await page.getByLabel(`${material.name} 수정하기`).locator("svg").click();

  //2. 메뉴담당자는 원자재를 수정한다.
  await page.getByLabel("원자재 이름 입력").click();
  await page.getByLabel("원자재 이름 입력").fill(material.newName);
  await page.getByRole("button", { name: "확인" }).click();
}

export async function 원자재_삭제_유즈케이스(
  page: Page,
  material: {
    name: string;
  },
) {
  //1. 메뉴담당자는 삭제할 원자재의 상세 페이지로 이동한다.
  await page.goto("/material-list");
  await page.getByLabel(`${material.name} 수정하기`).locator("svg").click();

  //2. 메뉴담당자는 원자재를 삭제한다.
  await page.getByRole("button", { name: "삭제" }).click();

  //3. 시스템은 메뉴담당자에세 삭제함을 한번 더 묻는다.
  await page.getByText("정말로 삭제하시겠어요?");
  await page.getByRole("button", { name: "네" }).click();
}
