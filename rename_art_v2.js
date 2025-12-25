const fs = require('fs');
const path = require('path');

const directory = 'd:\\Projects\\final_portfolio\\client\\public\\art';

try {
    if (!fs.existsSync(directory)) {
        console.error(`Directory not found: ${directory}`);
        process.exit(1);
    }

    const files = fs.readdirSync(directory);
    console.log(`Found ${files.length} files.`);

    let counter = 1;
    let jsArray = [];

    files.forEach(file => {
        // Skip already renamed files to avoid double renaming if run multiple times
        if (file.startsWith('art-') && (file.endsWith('.jpg') || file.endsWith('.mp4'))) {
             const ext = path.extname(file);
             const type = (ext === '.mp4' || ext === '.mov') ? 'video' : 'image';
             jsArray.push(`  { type: '${type}', src: '/art/${file}' },`);
             counter++; // Keep counter moving to avoid collisions if we mix old and new
             return;
        }

        const ext = path.extname(file);
        const oldPath = path.join(directory, file);
        const newName = `art-${counter}${ext}`;
        const newPath = path.join(directory, newName);

        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newName}`);
            
            const type = (ext === '.mp4' || ext === '.mov') ? 'video' : 'image';
            jsArray.push(`  { type: '${type}', src: '/art/${newName}' },`);
            counter++;
        } catch (err) {
            console.error(`Error renaming ${file}:`, err.message);
        }
    });

    console.log('\n--- JS ARRAY ---');
    console.log('const artItems = [');
    jsArray.forEach(line => console.log(line));
    console.log('];');

} catch (err) {
    console.error('Script error:', err);
}
