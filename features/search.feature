Feature: Buy a movie tickets on site
    Scenario: Should buy button disabled on unavailable tickets
        Given user is on the movie booking website
        When user tries to select unavailable tickets
        Then the buy button should be disabled
    Scenario: User buy one movie ticket
        Given user is on the movie booking website
        When user buy a movie ticket on site
        Then user see his ticket
    Scenario: User buy multiple movie tickets
        Given user is on the movie booking website
        When user buy a multiple movie tickets on site
        Then user see his ticket