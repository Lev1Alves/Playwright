import { test, expect } from "@playwright/test";

test.only('login funcional', async ({ page }) => {
    //login
    await page.goto('https://escola-digital-ver2-4ds9.vercel.app/');

    await page.locator('id=matricula').fill('teste');
    await page.locator('id=password').fill('12345');

    await page.locator('button.login-btn:not(.login-btn-professor)').click();

    // go to boletim page
    await page.locator('li >> a[href="../boletim/"]').click();




});