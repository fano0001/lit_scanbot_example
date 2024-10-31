# Start the Project
- use `yarn install` to install the dependencies
- use `yarn start` to start the environment. The browser will automatically display the page


# Enable / Disable ShadowRoot feature
- go to `src/app/_ui/document-scanner/DocumentScanner.ts` 
- if the method in line 22 is comment out, lit will render the content in a shadow root.
The error of Scanbot will appear
- If the method is active, scanbot will render correct with all styles