const {defineConfig} = require("cypress");

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    watchForFileChanges: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: "report/assets",
    retries: {
        runMode: 0
    },
    e2e: {
        setupNodeEvents(on, config) {
            on('before:browser:launch', (browser = {}, launchOptions) => {
                console.log('launching browser %s is headless? %s', browser.name, browser.isHeadless,)
                const width = 1920
                const height = 1080
                console.log('setting the browser window size to %d x %d', width, height)
                if (browser.name === 'chrome' && browser.isHeadless) {
                    launchOptions.args.push(`--window-size=${width},${height}`)
                    launchOptions.args.push('--force-device-scale-factor=1')
                }
                if (browser.name === 'electron' && browser.isHeadless) {
                    launchOptions.preferences.width = width
                    launchOptions.preferences.height = height
                }
                if (browser.name === 'firefox' && browser.isHeadless) {
                    launchOptions.args.push(`--width=${width}`)
                    launchOptions.args.push(`--height=${height}`)
                }
                return launchOptions
            })
            require('@cypress/grep/src/plugin')(config);
            require('cypress-localstorage-commands/plugin')(on, config);
            require('cypress-mochawesome-reporter/plugin')(on);
        },
        baseUrl: "https://www.enuygun.com/",
        viewportWidth: 2048,
        viewportHeight: 1536,
        chromeWebSecurity: false,
        testIsolation: false,
        defaultCommandTimeout: 15000,
        experimentalSourceRewriting: false,
        hideXHR: true
    }
});
