const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  });

console.log('\nBuilding redux-list umd...');

exec('rollup -c -f umd -i src/index.js -o index.js', {
  NODE_ENV: 'production'
});

console.log('\nBuilding redux-list esm...');

exec('rollup -c -f esm -i src/index.js -o es/index.js', {});

const size = gzipSize.sync(fs.readFileSync('index.js'));

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
