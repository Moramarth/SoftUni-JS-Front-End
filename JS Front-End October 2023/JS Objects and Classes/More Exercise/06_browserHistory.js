function browserHistory(obj, actionsArray) {
    const commandIsOpen = (command) => command.startsWith("Open");
    const commandIsClose = (command) => command.startsWith("Close");
    const commandIsClearHistory = (command) => command === "Clear History and Cache"

    const actions = {
        open: (string) => {
            tab = string.slice(5);
            obj["Open Tabs"].push(tab);
            obj["Browser Logs"].push(string);
        },

        close: (string) => {
            tab = string.slice(6);
            if (obj["Open Tabs"].includes(tab)) {
                tabAtIndex = obj["Open Tabs"].indexOf(tab);
                obj["Open Tabs"].splice(tabAtIndex, 1);
                obj["Recently Closed"].push(tab);
                obj["Browser Logs"].push(string);
            }
        },

        clear: () => {
            obj["Open Tabs"] = [];
            obj["Recently Closed"] = [];
            obj["Browser Logs"] = [];
        }
    }

    for (let command of actionsArray) {
        if (commandIsOpen(command)) actions.open(command);
        else if (commandIsClose(command)) actions.close(command);
        else if (commandIsClearHistory(command)) actions.clear();
    }

    console.log(obj["Browser Name"]);
    console.log(`Open Tabs: ${obj["Open Tabs"].join(", ")}`);
    console.log(`Recently Closed: ${obj["Recently Closed"].join(", ")}`);
    console.log(`Browser Logs: ${obj["Browser Logs"].join(", ")}`);
}