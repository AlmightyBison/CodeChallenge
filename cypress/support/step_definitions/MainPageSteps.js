import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { MainPage } from "../../page_objects/MainPage";
import { SlotPage } from "../../page_objects/SlotPage";

Given("I navigate to boostcasino from desktop device", function () {
  MainPage.openMainDesktopPage();
  MainPage.dropdownLanguageIsVisible();
  MainPage.searchFieldIsVisible();
  MainPage.screenshot();
});

When("I enter {string} in search field on main page", function (name) {
  MainPage.enterTextInSearch(name);
  MainPage.checkSearchResultsContains(name);
  MainPage.screenshot();
});

Then("I click on play button of {string} in search results", function (name) {
  MainPage.clickOnPlayButtonOfSearchResultWithName(name);
});

Then("I verify {string} is loading", function (name) {
  SlotPage.verifyGameIsLoading();
  SlotPage.checkPageTitleWithName(name);
  SlotPage.screenshot();
});

When("I click on dropdown language button", function () {
  MainPage.clickOnDropdownLanguageButton();
  MainPage.screenshot();
});

Then(
  "I click on {string} option of dropdown language menu",
  function (language) {
    MainPage.clickOnDropdownLanguageOption(language);
  }
);

Then("I verify that page is on {string} language", function (language) {
  MainPage.verifyPageIsOnLanguage(language);
  MainPage.screenshot();
});

Given("I navigate to boostcasino from mobile device", function () {
  MainPage.openMainMobilePage();
});

When("I click on burger icon in {string} language", function (language) {
  MainPage.clickOnBurgerButton();
  MainPage.burgerMenuEntriesAreVisible(language);
});

Then(
  "I click on {string} option in {string} burger menu",
  function (option, language) {
    MainPage.clickOnBurgerOptionButton("main", option, language);
    MainPage.optionEntriesAreVisible(option, language);
    MainPage.screenshot();
  }
);

Then(
  "I check redirection of every sub options of {string} in {string} burger menu",
  function (option, language) {
    MainPage.checkRedirectionOfEverySubOptionsOfOptionInBurger(
      option, language
    );
  }
);
