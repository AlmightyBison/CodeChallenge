export class BasePage {
  static screenshot() {
    cy.screenshot({ capture: "runner", overwrite: true });
  }

  static click(selector) {
    cy.get(selector).click();
  }

  static clickOnContains(selector, text) {
    cy.get(selector).contains(text).click();
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static hasText(selector, text) {
    cy.get(selector).should("be.visible").and("has.text", text);
  }

  static hasAttributeText(selector, attribute, text) {
    cy.get(selector).invoke("attr", attribute).should("eq", text);
  }

  static containText(selector, text) {
    cy.get(selector).should("be.visible").and("contain.text", text);
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }
}
