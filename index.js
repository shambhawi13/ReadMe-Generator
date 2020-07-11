let fs = require('fs');
let inquirer = require('inquirer');
let axios = require('axios');
let licenseBadges = {
    "MIT": "[![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)",
    "GPL 3": "[![GPL3](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)",
    "GPL": "[![GPL](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)"
};

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
        type: "checkbox",
        name: "license",
        message: "Select license",
        choices: [
            "MIT",
            "GPL 3",
            "GPL",
            "Unlicensed"
        ]
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
    let githubLink = 'https://github.com/' + data.username;
    let githubAvatar = 'https://github.com/' + data.username + '.png';
    let formattedAvatar = '![avatar](' + githubAvatar + ')';
    let queryEmailUrl = 'https://api.github.com/users/' + data.username + '/events/public';

    axios.get(queryEmailUrl)
        .then(function (response) {
            // handle success
            let email = response.data[0].payload.commits[0].author.email;

            let template =
                `# ${data.title}

${data.description ? '## Description' : ''}
${data.description}

## Table of Contents 
${data.installation ? '* [Installation](#installation)' : ''}
${data.usage ? '* [Usage](#usage)' : ''}
${data.credit ? '* [Credits](#credits)' : ''}
${data.license ? '* [License](#license)' : ''}
${data.contributing ? '* [Contributing](#contributing)' : ''}
${data.test ? '* [Tests](#Tests)' : ''}

${data.installation ? '## Installation' : ''}
${data.installation}

${data.usage ? '## Usage' : ''}
${data.usage}

${data.credit ? '## Credits' : ''}
${data.credit}

${data.license ? '## License' : ''}
${data.license && (data.license == 'MIT' || data.license == 'GPL 3' || data.license == 'GPL') ? licenseBadges[data.license] : data.license}

${data.contributing ? '## Contributing' : ''}
${data.contributing}

${data.test ? '## Tests' : ''}
${data.test}

${data.username ? '## Author' : ''}
${data.username ? 'Name: ' + data.username + ' <br/>' : ''} 
${data.username ? 'Email: ' + email + ' <br/>' : ''}
${data.username ? 'Github: ' + githubLink + ' <br/>' : ''} 
${data.username ? 'Profile picture ' + ' <br/> ' + formattedAvatar : ''}`;


            fs.writeFile("generated.md", template, data, function (err) {

                if (err) {
                    return console.log('Incorrect username' + err.statusText);
                }

                console.log("Success!");
            });

        }).catch(function (error) {
            console.log('Incorrect username' + error.statusText);
        });

}).catch(function (error) {
    console.log(error);
});