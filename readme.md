# README

How to setup a project:

    npm install
    npm start
Go to /dist and open index.html file

----------------------

Start tests:

    npm test

### How to use app module:

CashMachineApp accepts two parameters:
1. rootNode (obligatory) - HTML element showing where the app should be rendered into
2. config (optional)

        new CashMachineApp(rootNode, {
            cashMachine, // function
            availableNotes: [100, 20, 10],
            maxValue: 100500
        });
