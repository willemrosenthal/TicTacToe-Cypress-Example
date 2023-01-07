const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1000,
  viewportHeight: 880,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
