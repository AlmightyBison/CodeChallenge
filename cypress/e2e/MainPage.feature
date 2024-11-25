Feature: Main Page Features

    @BC-001
    Scenario: Game
        Given I navigate to boostcasino from desktop device
        When I enter "book of dead" in search field on main page
        And I click on play button of "book of dead" in search results
        Then I verify "Book of Dead" is loading

    @BC-002
    Scenario Outline: Language Switching
        Given I navigate to boostcasino from desktop device
        When I click on dropdown language button
        And I click on "<language>" option of dropdown language menu
        Then I verify that page is on "<language>" language
        Examples:
            | language |
            | FI       |
            | EE       |
            | RU       |

    @BC-003
    Scenario: Main Site Navigation through mobile
        Given I navigate to boostcasino from mobile device
