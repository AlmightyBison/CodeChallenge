Cypress + JavaScript
================================================================

## Preconditions
- Node.js and npm are installed. Currently used v22.11.0 and 10.9.0.

- For better visualisation, plugin "Cucumber (Gherkin) Full Support" can be installed on the VSC.

- Run "npm install" command to install all necessary dependencies.


## How to execute test

- To open cypress widnow, run "npx cypress open" command. 
  Select "E2E Testing" and needed browser. 
  Then click on "Start E2E Testing in ..." button.
  In opened browser window you can select feature files to run them. 

- To generate new cucumber-report, run "npx cypress run" command. 
  There will be updated cucumber-report.html file in the main automation folder.
  Reveal that file in File Explorer and open it in needed browser.