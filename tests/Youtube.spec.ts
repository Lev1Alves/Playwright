import { test, expect } from "@playwright/test";

test.only('fiasco yt', async ({ page }) => {

    // go to youtube

    await page.goto('https://www.youtube.com/')

    //search channel

    await page.locator('.ytSearchboxComponentInput').fill('fiasco');
    await page.locator('.ytSearchboxComponentSearchButton').click();

    // select the channel page

    await expect(await page.url()).toBe('https://www.youtube.com/results?search_query=fiasco')
    await page.locator('yt-formatted-string:text-is("Fiasco")').click();

    // go to videos page
    
    await page.locator('.yt-tab-shape-wiz__tab', { hasText: 'Videos' }).click();

    //select a video
    await page.locator('yt-formatted-string:text-is("O tipo de APP que você NAO DEVERIA CRIAR!")').click();

    await page.pause();


});