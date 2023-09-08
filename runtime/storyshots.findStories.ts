import { test } from '@playwright/test'
import { storyshotsEnv } from './storyshots.env.js'
import { executionContext } from './storyshots.executionContext.js'
import { testStories } from './storyshots.testStories.js'

const env = storyshotsEnv()
const context = executionContext()

test.describe.only('find stories to test', () => {
    testStories(env, async (page, storiesList) => {
        console.log(`${storiesList.length} stories to test`)
        if (env.listStories) {
            storiesList.forEach((story) => {
                console.log(`🔘 ${story.title}`)
            })
        }

        return context.setStories(storiesList)
    })
})
