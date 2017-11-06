const fs = require('fs');

const diretorios = fs.readdirSync('c:/users/dougl');

console.log('Diretótios:', diretorios);

const packageJson = fs.readFileSync('./package.json', 'utf8');

console.log('package.json:', packageJson);
