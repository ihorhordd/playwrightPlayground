import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', {outputFolder: 'test_results'}],
        ['monocart-reporter', {
            name: 'My Test Reporter',
            outputFile: './test_results/monoreport.html'
        }]],
    use: {
        baseURL: 'http://127.0.0.1:8000',
        trace: 'on',
        headless: false
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',

            use: {...devices['Desktop Chrome']},
        },
        //
        // {
        //     name: 'firefox',
        //     use: {...devices['Desktop Firefox']},
        // },
        //
        // {
        //     name: 'webkit',
        //     use: {...devices['Desktop Safari']},
        // },
    ],

});
