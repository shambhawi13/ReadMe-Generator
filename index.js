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
        name: "description",
        message: "Describe your project?"
    },
    {
        type: "input",
        name: "installation",
        message: "Explain process of installation"
    },
    {
        type: "input",
        name: "usage",
        message: "How can your application be used?"
    },
    {
        type: "input",
        name: "license",
        message: "Enter license detail, If any?"
    },
    {
        type: "input",
        name: "credit",
        message: "List all contributors"
    },
    {
        type: "input",
        name: "contributing",
        message: "Describe steps how developer can contribute to your project."
    },
    {
        type: "input",
        name: "test",
        message: "Enter any test you have written."
    }
]).then(function (data) {

    console.log(data);
let template = 
`# ${data.title}

${data.description?'## Description' : ''}
${data.description}

## Table of Contents 
${data.installation?'* [Installation](#installation)' : ''}
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Badges](#badges)
* [Contributing](#contributing)
* [Tests](#Tests)

${data.installation?'## Installation' : ''}
${data.installation}

${data.usage?'## Usage' : ''}
${data.usage}

${data.credit?'## Credits' : ''}
${data.credit}

${data.license?'## License' : ''}
${data.license}

${data.badges?'## Badges' : ''}

${data.contributing?'## Contributing' : ''}
${data.contributing}

${data.test?'## Tests' : ''}
${data.test}`;

    //JSON.stringify(data, null, '\t')
    fs.writeFile("generated.md", template , data, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");
    });

});