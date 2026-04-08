const fs = require('fs');
const path = require('path');

const replaceInDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/\.\.\/context\//g, '../../context/');
      content = content.replace(/\.\.\/api\//g, '../../api/');
      fs.writeFileSync(fullPath, content);
    }
  });
};

replaceInDir('d:/hcl_hack_anti/src/pages');
replaceInDir('d:/hcl_hack_anti/src/components');
console.log('Fixed imports!');
