// @ts-check
const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
  });
  describe("Login", () => {
    test("login succesful", async ({ page }) => {
      await page.getByTestId("username").fill("bbbbb");
      await page.getByTestId("password").fill("salasana");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("aaaa logged in")).toBeVisible();
    });

    test("login failed", async ({ page }) => {
      await page.getByTestId("username").fill("bb");
      await page.getByTestId("password").fill("salasa");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("bbbbb");
      await page.getByTestId("password").fill("salasana");
      await page.getByRole("button", { name: "Login" }).click();
    });

    test("A new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("testiblogi");
      await page.getByTestId("author").fill("testaaja");
      await page.getByTestId("url").fill("testiurl");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("Added New Blog testiblogi by testaaja"),
      ).toBeVisible();
      await expect(page.getByText("testiblogi testaaja")).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "like" }).first().click();
      await expect(page.getByText("Liked jdsndjnf by kdkmdm")).toBeVisible();
    });

    test("A new blog can be deleted after creation", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("poistoblogi");
      await page.getByTestId("author").fill("poistotestaaja");
      await page.getByTestId("url").fill("poistourl");
      await page.getByRole("button", { name: "create" }).click();

      await page.reload();
      await page.getByRole("button", { name: "view" }).last().click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("Deleted poistoblogi by poistotestaaja"),
      ).toBeVisible();
    });

    test("only the user who created the blog can delete it", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "view" }).last().click();
      await expect(page.getByRole("button", { name: "remove" })).toBeHidden();
    });

    test("blogs are sorted by likes", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("likeblogi");
      await page.getByTestId("author").fill("liketestaaja");
      await page.getByTestId("url").fill("likeurl");
      await page.getByRole("button", { name: "create" }).click();

      await page.reload();

      await page.getByRole("button", { name: "view" }).last().click();

      for (let i = 0; i < 11; i++) {
        await page.getByRole("button", { name: "like" }).click();
      }

      await page.getByRole("button", { name: "hide" }).click();

      await page.getByRole("button", { name: "view" }).first().click();

      await expect(page.getByText("url: likeurl")).toBeVisible();
    });
  });
});
