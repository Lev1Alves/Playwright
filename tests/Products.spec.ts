import { test, expect } from "@playwright/test";

test('the correct product go to cart', async ({ page }) => {
  
  //go to initial page

  await page.goto('https://www.saucedemo.com/');
  await expect(await page.title()).toBe('Swag Labs');

// login

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

//go to inventory page

  await page.locator('[data-test="login-button"]').click();
  await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')

  //select a product
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  // expect the product to go to cart
  await expect(page.locator('[data-test="inventory-item-name"]'))
    .toHaveText('Sauce Labs Bike Light')

});

test('all product name begin with "Sauce Labs"', async ({ page }) => {
  test.fail();
  
  //login step

  await test.step('login', async () => {
    await page.goto('https://www.saucedemo.com/')
    await expect(await page.title()).toBe('Swag Labs');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  })
  
  // select all item titles to verify

  test.step('title verification', async () => {

    // Search for all invetory item name
    const Titlelistlocator = await page.locator('.inventory_item_name');

    // store all item name
    const Titlelistproduct = await Titlelistlocator.allTextContents();

    // verify if all items start with Sauce Labs
    for (const item of Titlelistproduct) {
      await expect(item.slice(0, 10)).toBe('Sauce Labs');
    }
  });
});


test('the payment work', async ({ page }) => {
  
  // go to initial page

  await page.goto('https://www.saucedemo.com/');
  await expect(await page.title()).toBe('Swag Labs');

// login

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');


  await page.locator('[data-test="login-button"]').click();

  // inventory page
  
  await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')

  // select a product

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  
  // go to cart

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]'))
    .toHaveText('Sauce Labs Bike Light')

// go to payment

await page.locator('[data-test="checkout"]').click();

  // put your credentials to payment
  await page.locator('[data-test="firstName"]').fill('teste');
  await page.locator('[data-test="lastName"]').fill('teste');
  await page.locator('[data-test="postalCode"]').fill('teste');

  await page.locator('[data-test="continue"]').click();

  // expect to item name was correct and the price

    await expect(page.locator('[data-test="inventory-item-name"]'))
    .toHaveText('Sauce Labs Bike Light')

    await expect(page.locator('[data-test="subtotal-label"]'))
    .toHaveText('Item total: $9.99')

    // buy item

    await page.locator('[data-test="finish"]').click();

    // expect to be finished
    await expect(page.locator('[data-test="complete-header"]'))
    .toHaveText('Thank you for your order!')

    // go back to inventory page 

    await page.locator('[data-test="back-to-products"]').click();

});
