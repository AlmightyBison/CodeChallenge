import { BasePage } from "./BasePage";

const MAIN_URL = "https://www.boostcasino.com";
const DEFAULT_MOBILE_NAME = "samsung-s10";
const OPTIONAL_ALLOW_COOKIE_BUTTON =
  "div #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection";
const DROPDOWN_LANGUAGE_BUTTON = ".active-item div[font-family='primary']";
const DROPDOWN_LANGUAGE_MENU = ".sc-tsFYE.hFCUsE";
const LOG_IN_BUTTON = ".sc-crXcEl.cQZcGq";
const DEPOSIT_AND_PAY_BUTTON = ".sc-hRwTwm .gtm-button";
const SEARCH_INPUT_FIELD = ".MuiInputBase-input";
const SEARCH_RESULT_NAMES = "div .sc-TRNrF h6";

const BURGER_BUTTON = ".burger";
const BURGER_ENTIRES = "[cursor='pointer']";

export class MainPage extends BasePage {
  static openMainDesktopPage() {
    cy.visit(MAIN_URL);
    this.enableOptionalCookie();
  }

  static openMainMobilePage() {
    cy.viewport(DEFAULT_MOBILE_NAME);
    cy.visit(MAIN_URL);
    this.enableOptionalCookie();
  }

  static enableOptionalCookie() {
    this.click(OPTIONAL_ALLOW_COOKIE_BUTTON);
  }

  static searchFieldIsVisible() {
    this.isVisible(SEARCH_INPUT_FIELD);
  }

  static enterTextInSearch(text) {
    this.type(SEARCH_INPUT_FIELD, text);
  }

  static checkSearchResultsContains(name) {
    this.waitLastElementOfSearchResultToAppear(name);

    cy.get(SEARCH_RESULT_NAMES).then(($list) => {
      if ($list.length > 1) {
        cy.wrap($list).each(($el) => {
          name.split(" ").forEach((word) => {
            cy.wrap($el).contains(word, { matchCase: false });
          });
        });
      }
    });
  }

  static waitLastElementOfSearchResultToAppear(name) {
    name.split(" ").forEach((word) => {
      cy.get(SEARCH_RESULT_NAMES)
        .last()
        .contains(word, { matchCase: false })
        .then(($el) => cy.log($el.text()));
    });
  }

  static clickOnPlayButtonOfSearchResultWithName(name) {
    cy.xpath(
      "//button[ancestor::figure[descendant::*[contains(translate(" +
        "text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')," +
        `"${name.toLowerCase()}")]]]`
    ).click();
  }

  static dropdownLanguageIsVisible() {
    this.isVisible(DROPDOWN_LANGUAGE_BUTTON);
  }

  static clickOnDropdownLanguageButton() {
    this.click(DROPDOWN_LANGUAGE_BUTTON);
    this.isVisible(DROPDOWN_LANGUAGE_MENU);
  }

  static clickOnDropdownLanguageOption(language) {
    this.clickOnContains(DROPDOWN_LANGUAGE_MENU, language);
    this.hasText(DROPDOWN_LANGUAGE_BUTTON, language);
  }

  static verifyPageIsOnLanguage(language) {
    // For more check points method need to be refactored
    cy.fixture("translations").then(function (body) {
      let obj = body[language];
      MainPage.hasText(LOG_IN_BUTTON, obj["logIn"]);
      MainPage.hasText(DEPOSIT_AND_PAY_BUTTON, obj["depositAndPlay"]);
      MainPage.hasAttributeText(
        SEARCH_INPUT_FIELD, "placeholder", obj["search"]
      );
    });
  }

  static clickOnBurgerButton() {
    this.click(BURGER_BUTTON);
  }

  static burgerMenuEntriesAreVisible(language) {
    this.burgerEntriesAreVisible("main", language);
  }

  static clickOnBurgerOptionButton(option, button, language) {
    cy.fixture("burgerEntries").then(function (body) {
      let btn = body[option][language][button];
      btn ? MainPage.clickOnContains(BURGER_ENTIRES, btn) : 
      cy.log("Nothing to click.");
    });
  }

  static optionEntriesAreVisible(option, language) {
    this.burgerEntriesAreVisible(option, language);
  }

  static burgerEntriesAreVisible(option, language) {
    cy.fixture("burgerEntries").then(function (body) {
      let main = body[option][language];
      Object.values(main).forEach((value) => {
        MainPage.isVisibleOnContains(BURGER_ENTIRES, value);
      });
    });
  }

  static checkRedirectionOfEverySubOptionsOfOptionInBurger(option, language) {
    cy.fixture("burgerMenuUrls").then(function (body) {
      let main = body[option][language];
      Object.keys(main).forEach((key) => {
        MainPage.clickOnBurgerOptionButton(option, key, language);
        cy.url().should("eq", MAIN_URL + main[key]);

        MainPage.clickOnBurgerButton();
        MainPage.clickOnBurgerOptionButton("main", option, language);
      });
    });
  }
}
