import { BasePage } from "./BasePage";

const MAIN_URL = "https://www.boostcasino.com/";
const OPTIONAL_ALLOW_COOKIE =
  "div #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection";
const DEFAULT_MOBILE = "samsung-s10";
const SEARCH_INPUT_FIELD = "[placeholder='Search']";
const SEARCH_RESULT_NAMES = "div .sc-TRNrF h6";

export class MainPage extends BasePage {
  static openMainDesktopPage() {
    cy.visit(MAIN_URL);
    this.enableOptionalCookie();
  }

  static openMainMobilePage() {
    cy.viewport(DEFAULT_MOBILE);
    cy.visit(MAIN_URL);
  }

  static enableOptionalCookie() {
    this.click(OPTIONAL_ALLOW_COOKIE);
  }

  static searchFieldIsVisible() {
    this.isVisible(SEARCH_INPUT_FIELD);
  }

  static enterTextInSearch(text) {
    this.type(SEARCH_INPUT_FIELD, text);
  }

  static checkSearchResultsWithName(name) {
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
}
