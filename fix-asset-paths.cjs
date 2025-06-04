const fs = require('fs');
const path = require('path');

const exts = ['.js', '.jsx', '.ts', '.tsx', '.css'];
const search = /(['"(])(\.\/|\.\.\/|src\/)assets\//g;
const replace = '$1/assets/';

function walk(dir, callback) {
    fs.readdirSync(dir).forEach((file) => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, callback);
        } else {
            callback(filepath);
        }
    });
}

walk('./src', (file) => {
    if (exts.includes(path.extname(file))) {
        let content = fs.readFileSync(file, 'utf8');
        if (search.test(content)) {
            content = content.replace(search, replace);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
});

// Also check CSS in the root (if any)
if (fs.existsSync('./src/index.css')) {
    let css = fs.readFileSync('./src/index.css', 'utf8');
    if (search.test(css)) {
        css = css.replace(search, replace);
        fs.writeFileSync('./src/index.css', css, 'utf8');
        console.log('Updated: ./src/index.css');
    }
}

console.log('Asset path update complete.');
