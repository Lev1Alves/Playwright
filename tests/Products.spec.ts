import  { test,expect } from "@playwright/test";

test('the user login with success ',async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
  await expect(await page.title()).toBe('Swag Labs');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');


  await page.locator('[data-test="login-button"]').click();
  await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]'))
    .toHaveText('Sauce Labs Bike Light');
 
});

test('all product name begin with "Sauce Labs"', async ({ page }) => {
  test.fail();
   //login step
   await test.step('login',async() =>{
    await page.goto('https://www.saucedemo.com/')
    await expect(await page.title()).toBe('Swag Labs');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
   }) 

   test.step('title verification',async() =>{
     const Titlelistlocator = await page.locator('.inventory_item_name');
     const Titlelistproduct = await Titlelistlocator.allTextContents();

     for(const item of Titlelistproduct){
      await expect(item.slice(0, 10)).toBe('Sauce Labs');
     }
   });
});