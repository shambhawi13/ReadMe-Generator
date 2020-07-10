let fs = require('fs');
let inquirer = require('inquirer');

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "Provide github username"
    },
    {
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    {
        type: "input",
        name: "Description",
        message: "Describe your project?"
    },
    {
        type: "input",
        name: "installation",
        message: "Explain process of installation"
    },
    {
        type: "input",
        name: "Usage",
        message: "How can your application be used?"
    },
    {
        type: "input",
        name: "License",
        message: "Enter license detail, If any?"
    },
    {
        type: "input",
        name: "Contributing",
        message: "List all contributors"
    },
    {
        type: "input",
        name: "test",
        message: "Enter test detail."
    }
]).then(function (data) {

    fs.writeFile("README.md", JSON.stringify(data, null, '\t'), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");
    });

});