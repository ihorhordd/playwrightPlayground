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
    workers: 1,
    reporter: [
        ['list'],
        ['html', {outputFolder: './html-report', open: 'never'}],
        ['monocart-reporter', {
            name: 'My Test Reporter',
            printSteps: true,
            outputFile: './test-results/monoreport.html'
        }],
    ],
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
    ],

});
