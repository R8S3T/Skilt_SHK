// checkImages.js
const fs = require('fs');
const path = require('path');

const mappingFilePath = path.join(__dirname, 'src/utils/imageMappings.ts'); // Passe den Pfad ggf. an
const assetsBasePath = path.join(__dirname, 'assets');

const content = fs.readFileSync(mappingFilePath, 'utf8');

// Alle require()-Pfadzeilen extrahieren
const regex = /require\(['"](\.\/\.\.\/assets\/[^'"]+)['"]\)/g;
let match;
let allFound = true;

console.log('\n🔍 Überprüfung der Bildpfade in imageMappings.ts ...');

while ((match = regex.exec(content)) !== null) {
  const relativePath = match[1];
  const fullPath = path.join(__dirname, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn('❌ FEHLT:', relativePath);
    allFound = false;
  } else {
    console.log('✅ OK:', relativePath);
  }
}

if (allFound) {
  console.log('\n✅ Alle Bilder aus imageMappings.ts vorhanden.');
} else {
  console.log('\n⚠️ Einige Bilder fehlen. Bitte beheben, bevor du den nächsten iOS-Build startest.');
}
