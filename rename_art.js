const fs = require('fs');
const path = require('path');

const directory = 'd:\\Projects\\final_portfolio\\client\\public\\art';
const files = fs.readdirSync(directory);

let jsArray = [];
let counter = 1;

files.forEach(file => {
    const ext = path.extname(file);
    const oldPath = path.join(directory, file);
    const newName = `art-${counter}${ext}`;
    const newPath = path.join(directory, newName);
    
    // Rename file
    fs.renameSync(oldPath, newPath);
    
    // Add to array
    const type = (ext === '.mp4' || ext === '.mov') ? 'video' : 'image';
    jsArray.push(`  { type: '${type}', src: '/art/${newName}' },`);
    
    counter++;
});

console.log('const artItems = [');
jsArray.forEach(line => console.log(line));
console.log('];');
