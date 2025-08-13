import  { test,expect } from "@playwright/test";



test('the inventory title is right ',async ({page})=>{
  //login
  await page.goto('https://www.saucedemo.com/');
  await expect(await page.title()).toBe('Swag Labs');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  // expect to go to second page

  await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')
  const productTitle = await page.locator('.header_secondary_container > span');
  await expect (productTitle).toHaveText('Products');


  });

  test('the user inserts wrong credentials',async ({page}) =>{
    //login
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('teste');
    await page.locator('[data-test="password"]').fill('12345');
    
    await page.locator('[data-test="login-button"]').click();

    // expect to be error message on screen

    const ErrorMessage = await page.locator('data-test=error')
    await expect (ErrorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

    await expect(ErrorMessage).toBeVisible();
  })