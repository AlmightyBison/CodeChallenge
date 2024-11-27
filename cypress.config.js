const { defineConfig } = require("cypress");
const cucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const esbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const esbundler = require("@bahmutov/cypress-esbuild-preprocessor");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = esbundler({
        plugins: [esbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await cucumberPreprocessorPlugin(on, config);
      return config;
    },
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
    excludeSpecPattern: "*.js",
    viewportWidth: 1920,
    viewportHeight: 1080,
    animationDistanceThreshold: 1,
  },
});
