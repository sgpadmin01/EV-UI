import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1024, "height": 600})
        cwd = os.getcwd()
        file_url = f"file://{cwd}/client/pages/index.html"
        await page.goto(file_url)
        await asyncio.sleep(4) # wait for splash

        # Press Tab several times
        await page.keyboard.press("Tab")
        await page.screenshot(path="focus_tab1.png")
        await page.keyboard.press("Tab")
        await page.screenshot(path="focus_tab2.png")

        await browser.close()

asyncio.run(run())
