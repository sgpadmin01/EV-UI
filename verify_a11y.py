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
        # Wait for splash screen to disappear if needed or take screenshot
        await asyncio.sleep(4)
        await page.screenshot(path="dashboard_initial.png")
        await browser.close()

asyncio.run(run())
