import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I navigate to boostcasino from desktop device", function () {
  cy.visit("https://www.boostcasino.com/");
});

Given("I navigate to boostcasino from mobile device", function () {
    cy.viewport("samsung-s10");
    cy.visit("https://www.boostcasino.com/");
});
