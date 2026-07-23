import { test, expect } from "@playwright/test";

/**
 * These specs run against every viewport defined in playwright.config.ts
 * (iPhone SE, Pixel 5, iPad Mini, 1280px and 1920px desktop), so anything
 * that breaks at a particular screen size is caught per-device.
 */

test.describe("layout & scaling", () => {
  test("home redirects to French by default", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/fr$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("light theme is the default", async ({ page }) => {
    await page.goto("/fr");
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).not.toBe("dark");
    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    expect(bg).toBe("rgb(250, 250, 250)"); // #fafafa (light)
  });

  test("no horizontal overflow (content fits the screen)", async ({ page }) => {
    await page.goto("/fr");
    await expect(
      page.getByRole("heading", { level: 1, name: "Harisaran Vasu" })
    ).toBeVisible();

    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    // Allow 1px for sub-pixel rounding; anything more is a real overflow.
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("no element spills past the viewport width", async ({ page }) => {
    await page.goto("/fr");
    await expect(
      page.getByRole("heading", { level: 1, name: "Harisaran Vasu" })
    ).toBeVisible();

    const widest = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      let worst = 0;
      for (const el of Array.from(document.querySelectorAll("body *"))) {
        const right = el.getBoundingClientRect().right;
        if (right - vw > worst) worst = right - vw;
      }
      return worst;
    });
    expect(widest).toBeLessThanOrEqual(1);
  });

  test("key sections are present", async ({ page }) => {
    await page.goto("/fr");
    for (const id of [
      "skills",
      "work",
      "education",
      "participation",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });
});

test.describe("theme & language", () => {
  test("switching language preserves the chosen theme", async ({ page }) => {
    await page.goto("/fr");

    // Turn on dark mode via the toggle.
    await page.getByRole("button", { name: /th[eè]me|theme/i }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    // Switch FR -> EN and confirm dark mode survives the navigation.
    await page.getByRole("link", { name: "en", exact: true }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto("/fr");
    await expect(
      page.getByRole("heading", { level: 1, name: "Harisaran Vasu" })
    ).toBeVisible();

    expect(errors).toEqual([]);
  });
});

test.describe("links & assets", () => {
  test("email is a mailto link and phone is a tel link", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator('a[href^="mailto:"]').first()).toHaveAttribute(
      "href",
      /mailto:harisaran\.official@gmail\.com/
    );
    await expect(page.locator('a[href^="tel:"]').first()).toHaveAttribute(
      "href",
      /tel:\+33689247220/
    );
  });

  test("external links are safe (rel=noopener)", async ({ page }) => {
    await page.goto("/en");
    const external = page.locator('a[target="_blank"]');
    const count = await external.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(external.nth(i)).toHaveAttribute("rel", /noopener/);
    }
  });

  test("both institution logos load", async ({ page }) => {
    await page.goto("/en");
    const logos = page.locator('img[alt$="logo"]');
    await expect(logos).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      const loaded = await logos
        .nth(i)
        .evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalWidth > 0
        );
      expect(loaded).toBeTruthy();
    }
  });
});
