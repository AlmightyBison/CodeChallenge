import { BasePage } from "./BasePage";

const PAGE_TITLE = ".gtm-heading.h1";
const PROGRESS_BAR = "#pngPreloaderWrapper";
const GAME_IFRAME = "#ax-game-iframe";

export class SlotPage extends BasePage {
  static verifyGameIsLoading() {
    cy.iframe(GAME_IFRAME).find(PROGRESS_BAR).should("exist");
  }

  static checkPageTitleWithName(name) {
    this.containsText(PAGE_TITLE, name);
  }
}
