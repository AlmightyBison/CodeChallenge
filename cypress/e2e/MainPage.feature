Feature: Main Page Features

    @BC-001
    Scenario: Game
        Given I navigate to boostcasino from desktop device
        When I enter "book of dead" in search field on main page
        And I click on play button of "book of dead" in search results
        Then I verify "Book of Dead" is loading

    @BC-002
    Scenario: Scenario mobile
        Given I navigate to boostcasino from mobile device
