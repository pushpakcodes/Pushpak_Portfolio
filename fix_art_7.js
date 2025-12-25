const fs = require('fs');
const path = require('path');
const dir = 'd:\\Projects\\final_portfolio\\client\\public\\art';

try {
    const files = fs.readdirSync(dir);
    const target = files.find(f => f.startsWith('Day 95'));
    
    if (target) {
        fs.renameSync(path.join(dir, target), path.join(dir, 'art-7.mp4'));
        console.log('Successfully renamed Day 95... to art-7.mp4');
    } else {
        console.log('Target file starting with "Day 95" not found.');
    }
} catch (err) {
    console.error('Error:', err);
}
