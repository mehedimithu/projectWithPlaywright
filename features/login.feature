Feature: User Login Functionality

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username and password and clicks the login button
    Then the user should be redirected to the account page and a username should be displayed
