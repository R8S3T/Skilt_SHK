const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, 'src');
const ASSETS_DIR = path.resolve(__dirname, 'assets');

function findImageRequires(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findImageRequires(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractImagePaths(fileContent) {
  const regex = /require\(['"`](\.\.\/.*?\.(png|jpg|jpeg|gif))['"`]\)/g;
  const paths = [];
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

function checkImages() {
  console.log('🔍 Prüfe alle require()-Bildpfade in .ts-Dateien ...');
  const tsFiles = findImageRequires(PROJECT_DIR);
  const missing = [];

  tsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const paths = extractImagePaths(content);
    paths.forEach(relPath => {
      const absPath = path.resolve(path.dirname(file), relPath);
      if (!fs.existsSync(absPath)) {
        missing.push({ file, path: relPath });
      }
    });
  });

  if (missing.length > 0) {
    console.warn('🚫 Fehlende Bilder gefunden:\n');
    missing.forEach(({ file, path }) => {
      console.log(`❌ ${path} in ${file}`);
    });
  } else {
    console.log('✅ Alle require()-Bildpfade sind gültig.');
  }
}

checkImages();
