const fs = require('fs');

const data = fs.readFileSync('README.md', 'utf-8');

const newData = data.replace(/React/ig, "## Node.js Crash Course");
console.log(data);
console.log(newData);

fs.writeFileSync('README-Angular.md', newData);