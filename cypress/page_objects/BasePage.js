export class BasePage {
  static screenshot() {
    cy.screenshot({ capture: "runner", overwrite: true });
  }

  static click(selector) {
    cy.get(selector).click();
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static containText(selector, text) {
    cy.get(selector).should("be.visible").and("contain.text", text);
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }
}
