import { expect, Page } from "@playwright/test"
import { StorybookStory } from "./storyshots.types"
import { storyshotsEnv } from "./storyshots.env"

const {
    maxDiffPixelRatio
} = storyshotsEnv()

export async function testStory(page: Page, { storyshot, url, ignore }: StorybookStory): Promise<Boolean> {
    if (ignore) {
        console.log(`💤 ${storyshot} (ignored via configuration)`)
        return true
    }

    await page.goto(url, { waitUntil: 'domcontentloaded' })

    const image = await page.screenshot({
        type: 'jpeg',
        animations: 'disabled',
        fullPage: true,
    })

    let storyPassed = true
    try {
        expect(image).toMatchSnapshot(storyshot, {
            maxDiffPixelRatio
        })
    } catch (err) {
        storyPassed = false
    }
    if (storyPassed) {
        console.log(`✅ ${storyshot}`)
    } else {
        console.log(`❌ ${storyshot}`)
    }
    return storyPassed
}