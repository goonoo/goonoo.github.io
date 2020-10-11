const yaml = require('js-yaml');
const fs = require('fs');
const inquirer = require('inquirer');

const randomKey = obj => {
  const keys = Object.keys(obj);
  return keys[ keys.length * Math.random() << 0];
};

const q = (words) => {
  const k = randomKey(words);
  inquirer.prompt({
    type: 'input',
    name: 'word',
    message: Math.random() > .5 ? k : words[k],
  }).then(answers => {
    console.info(k, '->', words[k], 'https://en.dict.naver.com/#/search?range=all&query=' + k);
    q(words);
  });
};

const run = () => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync('./words.yaml', 'utf8'));
    q(doc);
  } catch (e) {
    console.log(e);
  }
};

run();
